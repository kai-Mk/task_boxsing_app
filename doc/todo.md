# 開発 Todo

MVP 機能を実装するための作業リスト。
各機能を実装する際に、必要なディレクトリ・共通処理・定数は都度作成する。

---

## Phase 1: 認証

### 1-1. Auth.js セットアップ

- [x] Auth.js の設定ファイル作成 (`lib/auth.ts`) - NextAuth v4, JWT戦略
- [x] セッション管理の設定
- [x] `getCurrentUser()` ヘルパー作成 (`server/auth/getCurrentUser.ts`)

### 1-2. メール/パスワード認証

- [x] 新規登録ページ (`app/(auth)/register/page.tsx`)
- [x] 新規登録フォーム（名前・メール・パスワード） - react-hook-form + zod
- [x] パスワードハッシュ化処理 - bcryptjs
- [x] 登録 API (`app/api/auth/register/route.ts`)
- [x] User Repository / Service 作成
- [x] ログインページ (`app/(auth)/login/page.tsx`)
- [x] ログインフォーム - react-hook-form + zod + signIn
- [x] Credentials Provider 設定
- [x] Toast コンポーネント作成（成功通知用）

### 1-3. Google OAuth

- [ ] Google Provider 設定
- [ ] 既存メールとの統合処理
- [ ] OAuth コールバック処理

### 1-4. 認証ガード

- [x] 未ログイン時のリダイレクト処理
- [x] 保護ルートのミドルウェア設定 (`middleware.ts` - withAuth)

### 1-5. 共通UIコンポーネント（認証で作成）

- [x] Input コンポーネント（パスワード表示/非表示トグル付き）
- [x] Button コンポーネント
- [x] AuthCard コンポーネント
- [x] Toast コンポーネント（フェードアニメーション付き）

### 1-6. 共通ユーティリティ（認証で作成）

- [x] Prisma クライアント (`server/db.ts`)
- [x] API クライアント (`lib/api-client.ts`)
- [x] バリデーションスキーマ (`lib/validators/auth.ts`)

---

## Phase 2: チーム作成・選択

### 2-1. チーム作成

- [ ] チーム作成ページ (`app/(app)/teams/new/page.tsx`)  ← `/teams/new`
- [ ] チーム作成フォーム（名前・説明）
- [ ] Team Repository / Service 作成
- [ ] チーム作成 API
- [ ] 作成時に TeamMember (ADMIN) 自動追加

### 2-2. チーム選択・切り替え

- [x] ログイン後のチーム振り分けロジック
  - チームなし → `/teams/new` へ
  - チームあり → `/teams/[lastSelectedTeamId]/me` へ
- [ ] ヘッダーにチーム切り替えドロップダウン
- [ ] lastSelectedTeamId 更新処理

---

## Phase 3: 個人タスク管理（メイン機能）

### 3-1. タスク API・バックエンド

- [ ] Task Repository 作成
- [ ] Task Service 作成（時間バリデーション等）
- [ ] タスク一覧取得 API (`GET /api/tasks`)
- [ ] タスク作成 API (`POST /api/tasks`)
- [ ] タスク更新 API (`PUT /api/tasks/[taskId]`)
- [ ] タスク削除 API (`DELETE /api/tasks/[taskId]`)

### 3-2. タスク管理画面

- [ ] 個人タスクページ (`app/(app)/teams/[teamId]/me/page.tsx`)
- [ ] タスクリスト表示（左側）
- [ ] 完了チェックボックス
- [ ] タイムボクシングビュー（右側）
- [ ] 現在時刻ライン表示
- [ ] MTG 可否バッジ表示

### 3-3. タスク追加・編集

- [ ] タスク追加モーダル/フォーム
  - タスク名、日付、開始/終了時刻（15 分単位）
  - 種別（Work/Break）、MTG 可否、詳細、色
- [ ] タスク詳細モーダル
- [ ] タスク編集フォーム
- [ ] タスク削除確認

### 3-4. 日付切り替え

- [ ] デイトピッカー実装
- [ ] 日付変更時のタスク再取得

### 3-5. 未完了タスクリマインド

- [ ] 昨日の未完了タスク検出
- [ ] リマインド表示 UI
- [ ] タスク持ち越し機能

---

## Phase 4: チーム管理画面

### 4-1. メンバー一覧

- [ ] チームメンバー一覧ページ (`app/(app)/teams/[teamId]/team/page.tsx`)
- [ ] メンバーカード表示（横スクロール）
- [ ] 名前・ポジション・MTG 可否表示
- [ ] 名前検索機能
- [ ] 役職フィルタ機能
- [ ] 自分を除外するロジック

### 4-2. メンバー詳細

- [ ] メンバー詳細ページ (`app/(app)/teams/[teamId]/team/[userId]/page.tsx`)
- [ ] マイページと同じ UI（参照のみ）
- [ ] MTG ステータスバッジ表示

### 4-3. MTG 予約

- [ ] MeetingRequest Repository / Service 作成
- [ ] MTG 予約モーダル
- [ ] MTG 可能時間帯のみ選択可能
- [ ] コメント入力（必須）
- [ ] MTG 予約 API (`POST /api/meeting-requests`)
- [ ] MTG 編集・キャンセル機能
- [ ] キャンセル理由入力

### 4-4. MTG 承認・返信

- [ ] 受信した MTG リクエスト一覧
- [ ] 承認/却下 UI
- [ ] 返信メッセージ入力
- [ ] ステータス更新 API

---

## Phase 5: 設定画面

### 5-1. アカウント設定

- [ ] アカウント設定ページ (`app/(app)/account/settings/page.tsx`)
- [ ] 名前変更フォーム
- [ ] 名前更新 API

### 5-2. チーム設定（ADMIN のみ）

- [ ] チーム設定ページ (`app/(app)/teams/[teamId]/settings/page.tsx`)
- [ ] ADMIN 権限チェック
- [ ] チーム名変更
- [ ] 招待コード発行・表示
- [ ] TeamInvitation Repository / Service 作成
- [ ] 招待コードでメンバー追加
- [ ] メンバー一覧（権限付与・削除用）
- [ ] ADMIN 権限付与機能
- [ ] メンバー削除機能
- [ ] チーム削除（owner のみ、確認モーダル必須）

### 5-3. 招待コードでの参加

- [ ] 招待コード入力ページ
- [ ] 招待コード検証 API
- [ ] チーム参加処理

---

## Phase 6: 仕上げ・改善

- [ ] エラーハンドリング統一
- [ ] ローディング状態の UI
- [ ] トースト通知
- [ ] レスポンシブ対応
- [ ] アクセシビリティ改善

---

## 進め方

1. 各タスクは実装時にチェックを入れる
2. 共通処理・定数・型は必要になった時点で作成
3. 実装中に気づいた追加タスクはこのファイルに追記
