import { axiosRequest } from "@/lib/axios/config/axios-config";
import { PlantResponseDto } from "@/modules/plant/models/plant-model";

const BASE_URL = "/users";

class UserService {
  getAssignedPlants = async (id?: string): Promise<PlantResponseDto[]> => {
    return await axiosRequest.get(`${BASE_URL}/${id}/plants`);
  };
}

export const userService = new UserService();
