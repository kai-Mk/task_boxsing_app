# アーキテクチャ設計メモ

これまで会話で決めたアーキテクチャ方針をまとめたドキュメント。

---

## 1. 技術スタック

- フレームワーク: Next.js（App Router）
- 言語: TypeScript
- DB: PostgreSQL（開発環境は Docker）
- ORM: Prisma
- 認証: Auth.js（NextAuth）
  - メールアドレス＋パスワード
  - Google OAuth

- フォーム: react-hook-form + zod

---

## 2. 全体アーキテクチャ方針

- Next.js のフルスタック構成を採用し、以下のレイヤに大きく分ける：
  - **UI レイヤー**: `app/` 以下（ページ・ルーティング）＋ `features/` のコンポーネント
  - **アプリケーションレイヤー（サービス層）**: `server/**.service.ts`
  - **インフラレイヤー（永続化層）**: `server/**.repository.ts`（Prisma を直接触る層）
  - **共通ユーティリティ / バリデーション**: `lib/`（zod スキーマ、時間処理、API クライアントなど）
  - **データモデル**: `prisma/schema.prisma` + ER 図（`docs/er.md`）

- tRPC は現時点では採用せず、Next.js の Route Handlers（REST ライクな API）＋ zod で型安全性を担保する。

---

## 3. ディレクトリ構成（案）

```txt
src/
├─ app/
│  ├─ (public)/
│  │   ├─ login/
│  │   └─ register/
│  ├─ (auth)/
│  │   └─ api/
│  │       └─ auth/
│  │           └─ [...nextauth]/route.ts
│  ├─ (app)/
│  │   ├─ teams/
│  │   │   ├─ new/            // チーム新規作成
│  │   │   └─ [teamId]/
│  │   │       ├─ me/         // 個人タスク管理画面
│  │   │       ├─ team/       // チーム管理（メンバー一覧・詳細）
│  │   │       └─ settings/   // チーム設定（admin）
│  │   └─ account/
│  │       └─ settings/   // アカウント設定
│  └─ api/
│      ├─ tasks/
│      │   ├─ route.ts          // GET(一覧)/POST(作成)
│      │   └─ [taskId]/route.ts // GET/PUT/DELETE
│      ├─ meeting-requests/
│      │   ├─ route.ts          // POST(作成)
│      │   └─ [id]/route.ts     // PUT(承認/却下/キャンセル)k
│      ├─ teams/
│      │   ├─ route.ts          // POST(作成)
│      │   └─ [teamId]/
│      │        ├─ members/route.ts     // GET/追加
│      │        └─ invitations/route.ts // 招待コード発行
│      └─ positions/route.ts    // ポジションマスタ取得
│
├─ server/
│  ├─ db.ts                     // PrismaClient 初期化
│  ├─ auth/
│  │   ├─ config.ts             // Auth.js 設定
│  │   └─ getCurrentUser.ts     // セッションから User を取得
│  ├─ user/
│  │   ├─ user.repository.ts
│  │   └─ user.service.ts
│  ├─ team/
│  │   ├─ team.repository.ts
│  │   └─ team.service.ts
│  ├─ task/
│  │   ├─ task.repository.ts
│  │   └─ task.service.ts       // 昨日のタスク持ち越しロジック等
│  └─ meeting/
│      ├─ meeting.repository.ts
│      └─ meeting.service.ts
│
├─ features/
│  ├─ tasks/
│  │   ├─ components/
│  │   │   ├─ TaskPage.tsx        // 個人タスク画面の中身（client）
│  │   │   ├─ TaskForm.tsx
│  │   │   ├─ TaskList.tsx
│  │   │   └─ TimeboxingView.tsx
│  │   └─ hooks/
│  │       └─ useTasks.ts
│  ├─ meetings/
│  ├─ teams/
│  └─ account/
│
├─ lib/
│  ├─ validators/               // zod スキーマ（入力 & API 用）
│  ├─ api-client/               // fetch ラッパ
│  ├─ time/                     // 日付・時間ユーティリティ
│  └─ types/                    // 共通型
│
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
│
└─ docs/
   ├─ concept.md
   ├─ mvp.md
   ├─ user-stories.md
   └─ er.md
```

（`src/` を付けるかどうかは好み。既存プロジェクト構成に合わせて調整。）

---

## 4. Server Component / Client Component 方針

- **ページコンポーネント（`app/**/page.tsx`）は基本 Server Component\*\* とし、
  - `getCurrentUser()`
  - `taskService.getTasksForDate()`
  - `teamService.getTeamMembers()`
    などをサーバー側で実行し、初期表示データを SSR する。

- インタラクティブな UI（フォーム、モーダル、チェックボックスなど）は
  - `features/**/components` 配下に Client Component として定義し、
  - API を叩いて再描画する役割に集中させる。
  - API 呼び出しは `lib/api-client.ts` の fetch ラッパーを使用する。

### 例：個人タスク画面

- `app/teams/[teamId]/me/page.tsx`（Server Component）
  - 現在ユーザー・チーム・日付のタスク一覧を service 経由で取得
  - `TaskPage` コンポーネントに `initialTasks` を渡す

- `features/tasks/components/TaskPage.tsx`（Client Component）
  - `useState` やカスタムフックでタスク状態を管理
  - 追加・編集・削除・完了操作時に `/api/tasks` を叩く

---

## 5. API 方針（Route Handlers + zod）

- Next.js の Route Handlers を使用して `/app/api/**` に API を定義する。
- tRPC は現時点では使わず、以下のスタイルでシンプルに実装する：
  - Request Body / Query は **zod スキーマ**でバリデーション
  - currentUser は `getCurrentUser()` で取得
  - ビジネスロジックは service 層に集約
  - Prisma へのアクセスは repository 層経由

### 例：`POST /api/tasks`

- `app/api/tasks/route.ts`
  - 認証チェック
  - `taskCreateSchema` でバリデーション
  - `taskService.createTask()` を呼び出し

---

## 6. service / repository 分離方針

### repository 層

- 役割：**DB とのやり取りのみ**（Prisma のラッパ）
- Prisma を直接呼ぶのは repository のみとし、
  `prisma.task.findMany` などを他レイヤーに漏らさない。
- 1 テーブルにつき 1 repository を基本とする。

```ts
// server/task/task.repository.ts
import { prisma } from "../db";

export const taskRepository = {
  create(data: Prisma.TaskCreateInput) {
    return prisma.task.create({ data });
  },

  findByDate(params: { userId: number; teamId: number; date: Date }) {
    return prisma.task.findMany({
      where: {
        userId: params.userId,
        teamId: params.teamId,
        date: params.date,
      },
    });
  },
};
```

### service 層

- 役割：**ビジネスロジックの集約**。
  - チーム所属チェック
  - タイムボックスのルール（start < end, 15 分単位）
  - 昨日の未完了タスクの持ち越し
  - MeetingRequest のステータス遷移ルール など

- repository を組み合わせて処理する。

```ts
// server/task/task.service.ts
import { taskRepository } from "./task.repository";
import { teamMemberRepository } from "../team/team.repository";

export const taskService = {
  async createTask(input: {
    userId: number;
    teamId: number;
    date: Date;
    title: string;
    startTime: string;
    endTime: string;
    // ...他のフィールド
  }) {
    // 1. チーム所属チェック
    const isMember = await teamMemberRepository.isMember(
      input.teamId,
      input.userId
    );
    if (!isMember) throw new Error("Not a team member");

    // 2. 時間の整合性チェック
    if (input.startTime >= input.endTime) {
      throw new Error("Invalid time range");
    }

    // 3. 実際の保存
    return taskRepository.create(input);
  },
};
```

### ねらい

- API（Route Handlers）は「認証 + 入力取り出し + service 呼び出し」だけにして薄く保つ。
- Prisma や DB 構造が変わっても repository だけ直せばよいようにする。
- ビジネスルールが一箇所（service）にまとまっていて把握しやすくする。

---

## 7. 今後の拡張を見据えた余地

- tRPC を導入したくなった場合：
  - 現在の service 層のインターフェースをそのまま tRPC ルーターから呼び出せるようにしておく。

- 外部 API 連携（将来 Google カレンダー等）：
  - `server/integration/googleCalendar.service.ts` のように分離し、
    MeetingRequest や Task サービスから利用する形を想定。

このドキュメントは、実装しながら随時アップデートしていくことを前提とした「現在の合意されたアーキテクチャ」のスナップショットです。
