import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";
import { getValidationError } from "../utils/get-validation-error";
import { usePlantStore } from "@/stores/selected-plant-store";
import { toast } from "sonner";
import { env } from "next-runtime-env";

const axiosInstance = axios.create({
  baseURL: env("NEXT_PUBLIC_API_BASE_URL"),
  withCredentials: true,
});

const updateHeaders = async (request: AxiosRequestConfig) => {
  const session = await getSession();
  const accessToken = session?.accessToken;

  if (accessToken && request.headers) {
    request.headers.Authorization = `Bearer ${accessToken}`;
    request.headers["Content-Type"] = "application/json";
  }

  const selectedPlant = usePlantStore.getState().selectedPlant;

  if (selectedPlant?.id && request.headers) {
    request.headers["x-plant-id"] = selectedPlant.id;
  }

  return request;
};

axiosInstance.interceptors.request.use((request: any) => {
  if (request.url?.includes("/auth/")) return request;

  return updateHeaders(request);
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (axios.isCancel(error)) {
      return Promise.resolve();
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("⚠️ 401 Unauthorized: Redirect to login page");

      window.location.href = "/auth/login";
      return;
    }

    const errorMessage = getValidationError(error.code);
    console.error("ERROR: ", errorMessage);

    if (error.response?.status === 409) {
      toast.error("Error al eliminar", {
        description: error.response?.data?.message || "No se pudo eliminar el recurso.",
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
