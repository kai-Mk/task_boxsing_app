import { auth } from "./config";

export const getCurrentUser = async () => {
  const session = await auth();
  return session?.user ?? null;
};
