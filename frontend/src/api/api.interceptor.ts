import axios from "axios";

export const getContentType = () => ({
  "Content-Type": "application/json",
});

export const instance = axios.create({
  baseURL: "http://localhost:5254/api/",
  headers: getContentType(),
});

export const instanceUploadFiles = axios.create({
  baseURL: "http://localhost:5254/api/",
  headers: { "Content-Type": "multipart/form-data" },
});

// export const instance = axios.create({
//   baseURL: process.env.SERVER_URL,
//   headers: getContentType(),
// });
