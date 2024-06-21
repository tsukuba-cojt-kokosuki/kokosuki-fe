# kokosuki-fe

## Prerequisites

- Node.js 20

## Setup

一度 1~5 を実行したら、次回からは 5 のみで OK

1. [GitHub Cli](https://github.com/cli/cli) をインストール

2. リポジトリをクローン

```bash
$ gh repo clone tsukuba-cojt-kokosuki/kokosuki-fe
```

3. pnpm をインストール

```bash
$ npm install -g pnpm
```

4. npm パッケージのインストール

```bash
$ cd kokosuki-fe
$ pnpm install
```

5. 開発サーバの起動

```bash
$ pnpm dev
```

## Documents

- [React](https://ja.react.dev/reference/react) - UI ライブラリ
- [React Router](https://reactrouter.com/en/main/) - ページルーティングライブラリ
- [shadcn/ui](https://ui.shadcn.com/docs/) - コンポーネントライブラリ
- [Tailwind CSS](https://tailwindcss.com/docs/installation) - CSS フレームワーク
- [SWR](https://swr.vercel.app/) - データフェッチングライブラリ
- [Vite](https://vitejs.dev/guide/) - ビルドツール
