# author-chronology

## 導入したライブラリ

|      名前       | バージョン | 概要                                                   |
| :-------------: | :--------: | ------------------------------------------------------ |
|     Vue.js      |     3      | js フレームワーク                                      |
|   TypeScript    |    4.1     | jsを静的型付けにした言語                               |
| Ionic Framework |     5      | スマホアプリっぽいUIや画面遷移を提供するフレームワーク |
|    Capacitor    |     2      | スマホアプリのビルドやPWA化を支援するフレームワーク    |
|      sass       |            | scss記法を用いるために必要なライブラリ                 |
|                 |            |                                                        |

## 環境変数について
楽天APIを使用するために、`.env.local`に以下を記述する必要があります。

```
VUE_APP_RAKUTEN_API_APPLICATION_ID="<アプリケーションID>"
```

ちなみに、.envに.localとつけると、localのみ(gitから除外)という意味をもつ(下記公式doc参考)
- [Modes and Environment Variables | Vue CLI](https://cli.vuejs.org/guide/mode-and-env.html#using-env-variables-in-client-side-code)
