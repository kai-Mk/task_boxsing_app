import { taskRepository } from "./task.repository";
import { Task, TaskType, TaskColor, MtgAvailability } from "@prisma/client";
import { ServiceResult } from "@/types/server/result";

export const taskService = {
  create: async (data: {
    teamMemberId: string;
    date: Date;
    title: string;
    description?: string;
    startTime: number;
    endTime: number;
    type: TaskType;
    color: TaskColor;
    mtgAvailability: MtgAvailability;
  }): Promise<ServiceResult<Task>> => {
    const task = await taskRepository.create({
      teamMemberId: data.teamMemberId,
      date: data.date,
      title: data.title,
      description: data.description || null,
      startTime: data.startTime,
      endTime: data.endTime,
      type: data.type,
      color: data.color,
      mtgAvailability: data.mtgAvailability,
    });

    return { success: true, data: task };
  },

  getByTeamMemberAndDate: async (
    teamMemberId: string,
    date: Date
  ): Promise<ServiceResult<Task[]>> => {
    const tasks = await taskRepository.findByTeamMemberAndDate(
      teamMemberId,
      date
    );
    return { success: true, data: tasks };
  },

  delete: async (
    taskId: string,
    teamMemberId: string
  ): Promise<ServiceResult<Task>> => {
    const task = await taskRepository.findById(taskId);

    if (!task) {
      return { success: false, message: "タスクが見つかりません", status: 404 };
    }

    if (task.teamMemberId !== teamMemberId) {
      return {
        success: false,
        message: "このタスクを削除する権限がありません",
        status: 403,
      };
    }

    if (task.deletedAt) {
      return {
        success: false,
        message: "タスクは既に削除されています",
        status: 400,
      };
    }

    const deletedTask = await taskRepository.softDelete(taskId);
    return { success: true, data: deletedTask };
  },
};
