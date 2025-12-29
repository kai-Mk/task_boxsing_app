import { Task, TaskType, TaskStatus, TaskColor, MtgAvailability } from "@prisma/client";

// 表示確認用のモックデータ
export const MOCK_TASKS: Task[] = [
  {
    id: "task-1",
    teamMemberId: "tm-1",
    date: new Date("2025-01-15"),
    title: "設計書作成",
    description: "新機能の設計書を作成する",
    startTime: 540, // 09:00
    endTime: 630,   // 10:30
    type: TaskType.WORK,
    status: TaskStatus.TODO,
    color: TaskColor.BLUE,
    mtgAvailability: MtgAvailability.AVAILABLE,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: "task-2",
    teamMemberId: "tm-1",
    date: new Date("2025-01-15"),
    title: "コードレビュー",
    description: "PRのレビュー対応",
    startTime: 660, // 11:00
    endTime: 720,   // 12:00
    type: TaskType.WORK,
    status: TaskStatus.DONE,
    color: TaskColor.GREEN,
    mtgAvailability: MtgAvailability.UNAVAILABLE,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: "task-3",
    teamMemberId: "tm-1",
    date: new Date("2025-01-15"),
    title: "ランチ休憩",
    description: null,
    startTime: 720, // 12:00
    endTime: 780,   // 13:00
    type: TaskType.BREAK,
    status: TaskStatus.TODO,
    color: TaskColor.GRAY,
    mtgAvailability: MtgAvailability.UNAVAILABLE,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: "task-4",
    teamMemberId: "tm-1",
    date: new Date("2025-01-15"),
    title: "機能実装",
    description: "タスク管理画面のUI実装",
    startTime: 840,  // 14:00
    endTime: 1020,   // 17:00
    type: TaskType.WORK,
    status: TaskStatus.TODO,
    color: TaskColor.PURPLE,
    mtgAvailability: MtgAvailability.CHAT_ONLY,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: "task-5",
    teamMemberId: "tm-1",
    date: new Date("2025-01-15"),
    title: "チームMTG",
    description: "週次の進捗確認ミーティング",
    startTime: 1020, // 17:00
    endTime: 1080,   // 18:00
    type: TaskType.WORK,
    status: TaskStatus.TODO,
    color: TaskColor.ORANGE,
    mtgAvailability: MtgAvailability.UNAVAILABLE,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];
