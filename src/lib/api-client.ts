type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; message: string };

export const apiClient = {
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    const res = await fetch(url);
    return res.json();
  },

  post: async <T>(url: string, data: unknown): Promise<ApiResponse<T>> => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    const res = await fetch(url, {
      method: "DELETE",
    });
    return res.json();
  },
};
