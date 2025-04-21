import { GenericService } from "@/lib/react-query/services/generic-service";
import { RouteRequestDto, RouteResponseDto } from "../models/route-model";
import { axiosRequest } from "@/lib/axios/config/axios-config";

const BASE_URL = "/routes";

class RouteService extends GenericService<RouteRequestDto, RouteResponseDto> {
  constructor() {
    super(BASE_URL);
  }

  assignUserToRoute = async (routeId: number, userId: number): Promise<RouteResponseDto> => {
    return await axiosRequest.post(`${BASE_URL}/${routeId}/users/${userId}`);
  };

  unassignUserFromRoute = async (routeId: number, userId: number): Promise<RouteResponseDto> => {
    return await axiosRequest.delete(`${BASE_URL}/${routeId}/users/${userId}`);
  };

  assignElementToRoute = async (routeId: number, elementId: number): Promise<RouteResponseDto> => {
    return await axiosRequest.post(`${BASE_URL}/${routeId}/elements/${elementId}`);
  };

  unassignElementFromRoute = async (routeId: number, elementId: number): Promise<RouteResponseDto> => {
    return await axiosRequest.delete(`${BASE_URL}/${routeId}/elements/${elementId}`);
  };
}

export const routeService = new RouteService();
