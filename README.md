# 日本石油備蓄枯渇カウンター

資源エネルギー庁の公表データ・報道ベースの備蓄日数から、シナリオ別に枯渇までのカウントダウンを表示する静的サイトです。

| 項目 | URL |
|------|-----|
| リポジトリ | [github.com/gontarobee/oil](https://github.com/gontarobee/oil) |
| GitHub Pages（公開後） | [gontarobee.github.io/oil/](https://gontarobee.github.io/oil/) |

## GitHub Pages で公開する手順

### 1. GitHub にリポジトリを作る

- 本プロジェクトは **[gontarobee/oil](https://github.com/gontarobee/oil)** 想定です。
- **Public** を選ぶ（無料の GitHub Pages に必要）

### 2. このフォルダを push する（初回のみ）

ターミナルでこのフォルダに移動して実行:

```bash
git init
git add .
git commit -m "Initial commit: 石油備蓄枯渇カウンター"
git branch -M main
git remote add origin https://github.com/gontarobee/oil.git
git push -u origin main
```

※ すでに `git init` 済みなら、`git remote add origin …` と `git push -u origin main` だけでOKです。  
※ リモートは GitHub 上の **Code** ボタンに表示される URL をそのまま使っても構いません。

### 3. GitHub Pages を有効にする（GitHub Actions）

リポジトリには **`.github/workflows/pages.yml`** があります。次の順で設定します。

1. この変更を **`main` に push** する（ワークフローファイルがリポジトリに入っていること）
2. GitHub のリポジトリ → **Settings** → **Pages**
3. **Build and deployment** の **Source** で **GitHub Actions** を選ぶ  
   （**Deploy from a branch** のままだと、Actions 用のデプロイと食い違い **404** になることがあります）
4. **Actions** タブを開き、**Deploy GitHub Pages** が **緑（成功）** になるまで待つ

公開URL:

**https://gontarobee.github.io/oil/**

### 4. うまく表示されないとき

- **Settings → Pages** の **Source** が **GitHub Actions** になっているか確認
- **Actions** で **Deploy GitHub Pages** が失敗していないかログを確認
- ブラウザのキャッシュを消すか、シークレットウィンドウで開き直す
- 初回は反映まで **1〜10分** かかることがあります

## ローカルで確認

`index.html` をブラウザで開くか、簡易サーバー例:

```bash
python3 -m http.server 8080
```

→ `http://localhost:8080` を開く

## Google アナリティクス（GA4）

アクセス解析用に [analytics.js](analytics.js) を用意しています。

1. [Google アナリティクス](https://analytics.google.com/) でプロパティを作成し、**測定ID**（`G-xxxxxxxxxx`）を取得する。
2. `analytics.js` 内の `GA_MEASUREMENT_ID` にその ID を貼り付けてコミット・push する。
3. 空のままでは **送信されない**（開発中は未設定のままでも可）。

## SEO・ガイド記事

- [guide/index.html](guide/index.html) … 石油備蓄関連の読み物（内部リンク用ハブ）
- デプロイ後、Search Console に **`sitemap.xml`** を登録するとクロールしやすくなります（`https://gontarobee.github.io/oil/sitemap.xml`）
- **`robots.txt`** でサイトマップの場所を案内しています

## プライバシー

[プライバシーポリシー](privacy-policy.html) を参照してください（GA4 の記載あり）。

## ライセンス

データの出典はページ下部の「データ出典」を参照してください。
