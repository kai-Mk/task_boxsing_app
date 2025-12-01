# Task Boxing App

エンジニア向けタイムボクシング＆チームコラボレーションツール

## 概要

個人のタスクをタイムボクシング形式で管理しつつ、チーム内の作業状況を可視化し、MTG調整や相談タイミングをスムーズにするアプリケーションです。

### 主な機能

- **タイムボクシング**: タスクを15分単位の時間軸で管理
- **チーム可視化**: メンバーの作業状況とMTG可否をリアルタイム表示
- **ミーティング予約**: 相手の空き時間を確認して直接予約
- **チーム管理**: 招待コードでのメンバー追加、権限管理

## 技術スタック

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: Auth.js (NextAuth)
- **Styling**: Tailwind CSS
- **Forms**: react-hook-form + Zod

## セットアップ

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

```bash
cp .env.example .env.development
```

### 3. データベース起動

```bash
docker compose up -d
```

### 4. データベースセットアップ

```bash
pnpm db:generate
pnpm db:migrate
```

### 5. 開発サーバー起動

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000) でアプリケーションにアクセスできます。

## 開発コマンド

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# 本番サーバー起動
pnpm start

# リント
pnpm lint

# フォーマット
pnpm format

# Prismaクライアント生成
pnpm db:generate

# マイグレーション実行
pnpm db:migrate

# Prisma Studio起動
pnpm db:studio
```

## プロジェクト構成

詳細なアーキテクチャについては [CLAUDE.md](./CLAUDE.md) を参照してください。

```
src/
├── app/           # Next.js App Router
├── features/      # 機能別コンポーネント
├── server/        # サーバーサイドロジック
└── lib/           # 共通ライブラリ
```
