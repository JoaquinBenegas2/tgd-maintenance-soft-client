import { AxiosRequestConfig } from "axios";
import { axiosRequest } from "../../axios/config/axios-config";

export class GenericService<RequestDto = any, ResponseDto = any, PaginatedDto = any> {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getAll = async (
    config?: AxiosRequestConfig
  ): Promise<PaginatedDto> => {
    return await axiosRequest.get(this.baseUrl, config);
  };

  getById = async (id: string | number, config?: AxiosRequestConfig): Promise<ResponseDto> => {
    return await axiosRequest.get(`${this.baseUrl}/${id}`, config);
  };

  create = async (data: RequestDto): Promise<ResponseDto> => {
    return await axiosRequest.post(this.baseUrl, data);
  };

  update = async (id: string | number, data: RequestDto): Promise<ResponseDto> => {
    return await axiosRequest.put(`${this.baseUrl}/${id}`, data);
  };

  delete = async (id: string | number): Promise<void> => {
    await axiosRequest.delete(`${this.baseUrl}/${id}`);
  };
}
