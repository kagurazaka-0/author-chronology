# 著者年表アプリ(author-chronology)

楽天ブックAPIを用いて、著者名を検索すると作品の年表が閲覧できるアプリ。

## How to run

1. `npm i`を実行(初回のみ)
2. `npm start`を実行(`npm run serve:mock`と同等)
   - APIを使わないmockモードで開発サーバーを起動します。
   - APIを使用して検証する場合、下記の「環境変数について」に従い環境変数を記述し、`npm run serve`を実行
3. http://localhost:8080 を開く

## 導入したライブラリ

|      名前       | バージョン | 概要                                                   |
| :-------------: | :--------: | ------------------------------------------------------ |
|     Vue.js      |     3      | js フレームワーク                                      |
|   TypeScript    |    4.1     | jsを静的型付けにした言語                               |
| Ionic Framework |     5      | スマホアプリっぽいUIや画面遷移を提供するフレームワーク |
|    Capacitor    |     2      | スマホアプリのビルドやPWA化を支援するフレームワーク    |
|      sass       |            | scss記法を用いるために必要なライブラリ                 |
|                 |            |                                                        |

- node-vibrantという画像から色を抽出するライブラリの導入を試みたが、WebWorkerにAPIからの画像をダウンロードする際にクロスオリジンに引っ掛かり失敗したので未導入(add-vibrantブランチ、add-vibrant2ブランチ)

## 環境変数について
楽天APIを使用するために、`.env.local`に以下を記述する必要があります。

```
VUE_APP_RAKUTEN_API_APPLICATION_ID="<アプリケーションID>"
```

ちなみに、.envに.localとつけると、localのみ(gitから除外)という意味をもちます(下記公式doc参考)
- [Modes and Environment Variables | Vue CLI](https://cli.vuejs.org/guide/mode-and-env.html#using-env-variables-in-client-side-code)
