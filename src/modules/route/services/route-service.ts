import { GenericService } from "@/lib/react-query/services/generic-service";
import { ProgressRouteResponseDto, RouteRequestDto, RouteResponseDto } from "../models/route-model";
import { axiosRequest } from "@/lib/axios/config/axios-config";
import { AxiosRequestConfig } from "axios";

const BASE_URL = "/routes";

class RouteService extends GenericService<RouteRequestDto, RouteResponseDto> {
  constructor() {
    super(BASE_URL);
  }

  getTodayRoutes = async (): Promise<ProgressRouteResponseDto[]> => {
    return await axiosRequest.get(`${BASE_URL}/today`);
  };

  getWeekRoutes = async (): Promise<Record<string, ProgressRouteResponseDto[]>> => {
    return await axiosRequest.get(`${BASE_URL}/week`);
  };

  getDelayedRoutes = async (): Promise<ProgressRouteResponseDto[]> => {
    return await axiosRequest.get(`${BASE_URL}/delayed`);
  };

  assignUserToRoute = async (routeId: number, userId: number): Promise<RouteResponseDto> => {
    return await axiosRequest.post(`${BASE_URL}/${routeId}/users/${userId}`);
  };

  unassignUserFromRoute = async (routeId: number, userId: number): Promise<RouteResponseDto> => {
    return await axiosRequest.delete(`${BASE_URL}/${routeId}/users/${userId}`);
  };

  assignElementToRoute = async (routeId: number, elementId: number): Promise<RouteResponseDto> => {
    return await axiosRequest.post(`${BASE_URL}/${routeId}/elements/${elementId}`);
  };

  unassignElementFromRoute = async (
    routeId: number,
    elementId: number
  ): Promise<RouteResponseDto> => {
    return await axiosRequest.delete(`${BASE_URL}/${routeId}/elements/${elementId}`);
  };

  updateStatus = async (
    routeId: string | number,
    status: "ACTIVE" | "INACTIVE"
  ): Promise<RouteResponseDto> => {
    return await axiosRequest.patch(`${this.baseUrl}/${routeId}/status`, { status });
  };

  getAllByStatus = async (
    status: "ACTIVE" | "INACTIVE",
    config?: AxiosRequestConfig
  ): Promise<RouteResponseDto[]> => {
    return await axiosRequest.get(this.baseUrl, {
      params: { status },
      ...config,
    });
  };
}

export const routeService = new RouteService();
