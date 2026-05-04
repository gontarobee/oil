#!/usr/bin/env python3
"""複数RSS/Atomを取得し、リポジトリルートの news-rss.json を更新する（GitHub Actions 用）。"""
from __future__ import annotations

import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "news-rss.json"
CONFIG = Path(__file__).resolve().parent / "rss-feeds.json"

UA = "OilReserveCounterRSS/1.0 (+https://github.com/gontarobee/oil; contact via repo)"


def strip_tag(tag: str) -> str:
    if "}" in tag:
        return tag.rsplit("}", 1)[-1]
    return tag


def fetch_xml(url: str, timeout: float = 30.0) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read()


def iso_date_only(dt: datetime | None) -> str | None:
    if dt is None:
        return None
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc).date().isoformat()


def parse_rfc2822_date(s: str | None) -> str | None:
    if not s or not s.strip():
        return None
    try:
        dt = parsedate_to_datetime(s.strip())
        return iso_date_only(dt)
    except (TypeError, ValueError):
        return None


def parse_isoish(s: str | None) -> str | None:
    if not s or not s.strip():
        return None
    t = s.strip()
    if re.match(r"^\d{4}-\d{2}-\d{2}$", t):
        return t
    try:
        if t.endswith("Z"):
            t = t[:-1] + "+00:00"
        dt = datetime.fromisoformat(t.replace("Z", "+00:00"))
        return iso_date_only(dt)
    except ValueError:
        return None


def parse_atom(root: ET.Element, feed_meta) -> list[dict]:
    items: list[dict] = []
    for el in root:
        if strip_tag(el.tag) != "entry":
            continue
        title_el = link_href = updated_text = None
        for c in el:
            t = strip_tag(c.tag)
            if t == "title" and c.text:
                title_el = c.text.strip()
            elif t == "link" and c.get("href"):
                rel = (c.get("rel") or "alternate").lower()
                if rel in ("alternate", "self") or link_href is None:
                    link_href = c.get("href")
            elif t in ("updated", "published") and c.text:
                updated_text = c.text.strip()
        if not title_el or not link_href:
            continue
        day = parse_isoish(updated_text)
        items.append(
            {
                "title": title_el,
                "url": link_href.strip(),
                "date": day or "1970-01-01",
                "source": feed_meta["source"],
                "rss": True,
                "note": "RSSより自動取得（見出しのみ。詳細はリンク先でご確認ください）。",
            }
        )
    return items


def parse_rss2(root: ET.Element, feed_meta) -> list[dict]:
    items: list[dict] = []
    for ch in root.iter():
        if strip_tag(ch.tag) != "item":
            continue
        title = link = pub = None
        for c in ch:
            t = strip_tag(c.tag)
            if t == "title" and c.text:
                title = c.text.strip()
            elif t == "link" and c.text:
                link = c.text.strip()
            elif t == "pubDate" and c.text:
                pub = c.text.strip()
        if not title or not link:
            continue
        day = parse_rfc2822_date(pub)
        items.append(
            {
                "title": title,
                "url": link,
                "date": day or "1970-01-01",
                "source": feed_meta["source"],
                "rss": True,
                "note": "RSSより自動取得（見出しのみ。詳細はリンク先でご確認ください）。",
            }
        )
    return items


def parse_feed(content: bytes, feed_meta) -> list[dict]:
    root = ET.fromstring(content)
    tag = strip_tag(root.tag).lower()
    if tag == "feed":
        return parse_atom(root, feed_meta)
    if tag == "rss":
        return parse_rss2(root, feed_meta)
    # 稀なルート
    for child in root:
        if strip_tag(child.tag).lower() == "channel":
            return parse_rss2(root, feed_meta)
    return parse_atom(root, feed_meta)


def title_matches(title: str, patterns: list[str]) -> bool:
    if not patterns:
        return True
    for p in patterns:
        if p in title:
            return True
    return False


def main() -> int:
    cfg = json.loads(CONFIG.read_text(encoding="utf-8"))
    feeds = cfg.get("feeds") or []
    cap = int(cfg.get("globalMaxItems") or 25)
    merged: list[dict] = []
    seen_url: set[str] = set()

    for fm in feeds:
        url = fm["url"]
        try:
            raw = fetch_xml(url)
        except Exception as e:
            print(f"[warn] skip {url}: {e}", file=sys.stderr)
            continue
        try:
            parsed = parse_feed(raw, fm)
        except ET.ParseError as e:
            print(f"[warn] parse {url}: {e}", file=sys.stderr)
            continue
        max_i = int(fm.get("maxItems") or 30)
        patterns = fm.get("titleMustMatchAny") or []
        for it in parsed[:max_i]:
            if not title_matches(it["title"], patterns):
                continue
            u = it["url"].strip()
            if u in seen_url:
                continue
            seen_url.add(u)
            merged.append(it)

    merged.sort(key=lambda x: x["date"], reverse=True)
    merged = merged[:cap]

    payload = {
        "generatedAt": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "items": merged,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(merged)} items to {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
