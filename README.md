# 日本石油備蓄枯渇カウンター

資源エネルギー庁の公表データ・報道ベースの備蓄日数から、シナリオ別に枯渇までのカウントダウンを表示する静的サイトです。

## GitHub Pages で公開する手順

### 1. GitHub にリポジトリを作る

1. [GitHub](https://github.com) にログイン
2. **New repository** で新規リポジトリを作成（名前は任意、例: `oil-reserve-countdown`）
3. **Public** を選ぶ（無料の GitHub Pages に必要）

### 2. このフォルダを push する（初回のみ）

ターミナルでこのフォルダに移動して実行:

```bash
git init
git add .
git commit -m "Initial commit: 石油備蓄枯渇カウンター"
git branch -M main
git remote add origin https://github.com/<あなたのユーザー名>/<リポジトリ名>.git
git push -u origin main
```

※ すでに `git init` 済みなら、`remote add` と `push` だけでOKです。

### 3. GitHub Pages を有効にする

1. GitHub のリポジトリページ → **Settings**
2. 左メニュー **Pages**
3. **Build and deployment** の **Source** で **Deploy from a branch** を選択
4. **Branch** を `main` / **folder** を `/ (root)` にして **Save**

数分待つと、次のURLで公開されます（ユーザー名・リポジトリ名は自分のものに置き換え）:

`https://<ユーザー名>.github.io/<リポジトリ名>/`

### 4. うまく表示されないとき

- **Actions** タブでエラーがないか確認（Actions を使う設定にした場合）
- ブラウザのキャッシュを消すか、シークレットウィンドウで開き直す
- 初回は反映まで **1〜10分** かかることがあります

## ローカルで確認

`index.html` をブラウザで開くか、簡易サーバー例:

```bash
python3 -m http.server 8080
```

→ `http://localhost:8080` を開く

## ライセンス

データの出典はページ下部の「データ出典」を参照してください。
