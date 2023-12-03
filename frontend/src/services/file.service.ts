import { instanceUploadFiles } from "../api/api.interceptor";

export const FileService = {
  async upload(data: FormData) {
    const response = await instanceUploadFiles<{ imageUrls: string[] }>({
      url: `upload`,
      method: "POST",
      data,
    });
    return response;
  },
};
