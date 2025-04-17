import { axiosRequest } from "@/lib/axios/config/axios-config";
import { PlantResponseDto } from "../models/plant-model";

const BASE_URL = "/plants";

class PlantService {
  assignUserToPlant = async (plantId: number, userId: number): Promise<PlantResponseDto> => {
    return await axiosRequest.post(`${BASE_URL}/${plantId}/users/${userId}`);
  };

  unassignUserFromPlant = async (plantId: number, userId: number): Promise<PlantResponseDto> => {
    return await axiosRequest.delete(`${BASE_URL}/${plantId}/users/${userId}`);
  };
}

export const plantService = new PlantService();
