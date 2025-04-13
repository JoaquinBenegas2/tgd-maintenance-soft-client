import { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "../interceptors/axios-interceptor";

// Generic axiosRequest function
export const axiosRequest = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance({ ...config });
    return response?.data; // Typed response data
  } catch (error) {
    console.error("Error:", error);
    throw error; // Propagate the error for handling
  }
};

// Extend axiosRequest with method-specific helpers
axiosRequest.get = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return axiosRequest<T>({ method: "GET", url, ...config });
};

axiosRequest.post = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return axiosRequest<T>({ method: "POST", url, data, ...config });
};

axiosRequest.put = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return axiosRequest<T>({ method: "PUT", url, data, ...config });
};

axiosRequest.patch = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return axiosRequest<T>({ method: "PATCH", url, data, ...config });
};

axiosRequest.delete = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return axiosRequest<T>({ method: "DELETE", url, ...config });
};
