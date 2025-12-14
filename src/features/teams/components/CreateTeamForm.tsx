"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import { createTeamSchema, CreateTeamFormData } from "@/lib/validators/team";
import { apiClient } from "@/lib/api-client";
import { Team } from "@prisma/client";

const CreateTeamForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTeamFormData>({
    resolver: zodResolver(createTeamSchema),
  });

  const onSubmit = async (data: CreateTeamFormData) => {
    setError(null);
    setIsLoading(true);

    const result = await apiClient.post<Team>("/api/teams", data);

    if (!result.success) {
      setError(result.message);
      setIsLoading(false);
      return;
    }

    router.push(`/teams/${result.data.id}/me`);
  };

  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          チームを作成する
        </h1>

        <form className="relative space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <p className="absolute -top-7 left-0 right-0 text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          <Input
            label="チーム名"
            type="text"
            hint="50文字以内"
            required
            register={register("name")}
            error={errors.name?.message}
          />

          <TextArea
            label="詳細"
            hint="300文字以内"
            register={register("description")}
            error={errors.description?.message}
          />

          <Button type="submit" label={isLoading ? "作成中..." : "作成する"} loading={isLoading} />
        </form>
      </div>
    </div>
  );
};

export default CreateTeamForm;
