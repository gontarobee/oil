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

## データ更新ルーティン（毎日）

**毎日見て更新する。** 備蓄日数は速報で動くため、放置するとサイトと実態がずれる。

### 必ず見る場所

1. ブラウザで **[石油備蓄の現況（資源エネルギー庁）](https://www.enecho.meti.go.jp/statistics/petroleum_and_lpgas/pl001/)** を開く。
2. ページ内の **「石油備蓄の状況（推計値の速報）はこちら」** のリンクを開く（**最新の PDF**。ファイル名は公表日ごとに変わる。例: `pdf-oil-res/0403.pdf`）。
3. PDF に書かれた **備蓄日数**（国家・民間・産油国共同・**合計**）と、**公表日・データ時点** を確認する。

### 更新するファイル（数値が変わったら）

| ファイル | 内容 |
|----------|------|
| `script.js` | `RESERVE_DAYS`（合計日数）, `RESERVE_CAPACITY`（ゲージ100%の基準。通常は合計と同じ）, `REFERENCE`（**速報PDFのデータ時点**を `Date` で指定。公表日と別のことあり）。シナリオ説明文に「〇〇日分」が直書きされていれば合わせて修正。 |
| `index.html` | データカード4枚の数値・ラベル、ゲージ右端の「〇〇日 (データ時点)」、`#gaugeBar` の初期 `width`（任意）、「データ出典」の文言・**速報PDFへのリンクURL**（新しいファイル名に差し替え）。 |

放出・政策でカードの説明が古くなったら、速報と報道を踏まえて文言も直す。

最後に `main` に **commit & push** すれば GitHub Pages に反映される。

---

## SEO・ガイド記事

- [guide/index.html](guide/index.html) … 石油備蓄関連の読み物（内部リンク用ハブ）
- デプロイ後、Search Console にサイトマップを登録するとクロールしやすくなります
- **`robots.txt`** でサイトマップの場所を案内しています

### Search Console で「取得できませんでした」になるとき

1. **送信するURLは必ずフルパス**にする（プロジェクトサイトなので `/oil/` が要る）  
   **正:** `https://gontarobee.github.io/oil/sitemap.xml`  
   **誤:** `https://gontarobee.github.io/sitemap.xml`（こちらは 404 になりがち）
2. Search Console のプロパティは **URLプレフィックス** で  
   `https://gontarobee.github.io/oil/`  
   としているか確認する（`github.io` 直下だけだとサイトマップのパスと一致しない）。
3. ブラウザの**シークレット**で  
   `https://gontarobee.github.io/oil/sitemap.xml`  
   を開き、XML がそのまま表示されるか確認（表示されなければ未デプロイ or Pages 設定の問題）。
4. `main` に `sitemap.xml` が入った状態で **GitHub Actions のデプロイ成功**を確認。
5. 送信直後は「不明」「取得できません」が出ても、**数日待つ**と読み込まれることがある。古い送信は削除して、正しいフルURLで再送信してよい。
6. ブラウザでは開けるのに Search Console だけ「読み込めない」場合:
   - **設定 → 所有権の確認** で `https://gontarobee.github.io/oil/` のプロパティになっているか確認（`https://gontarobee.github.io/` だけだと `/oil/` 下のサイトマップとズレることがある）。
   - **URL 検査**に `https://gontarobee.github.io/oil/sitemap.xml` を入力し、「公開 URL が Google に登録されているかテスト」で **200** になるか確認。
   - サイトマップ一覧で **「最終読み込み日時」が空でも 24〜72 時間**待つ（新規サイトは遅れがち）。
7. サイトマップは **標準の最小XML**（`xmlns` のみ）にしている。`push` 後に上記URLで中身が更新されているか再確認する。

## プライバシー

[プライバシーポリシー](privacy-policy.html) を参照してください（GA4 の記載あり）。

## ライセンス

データの出典はページ下部の「データ出典」を参照してください。
