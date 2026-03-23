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

### 3. GitHub Pages を有効にする

1. GitHub のリポジトリページ → **Settings**
2. 左メニュー **Pages**
3. **Build and deployment** の **Source** で **Deploy from a branch** を選択
4. **Branch** を `main` / **folder** を `/ (root)` にして **Save**

数分待つと、次のURLで公開されます:

**https://gontarobee.github.io/oil/**

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

## プライバシー

[プライバシーポリシー](privacy-policy.html) を参照してください。

## ライセンス

データの出典はページ下部の「データ出典」を参照してください。
