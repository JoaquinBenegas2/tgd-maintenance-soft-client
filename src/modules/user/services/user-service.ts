import { axiosRequest } from "@/lib/axios/config/axios-config";
import { CompanyResponseDto } from "@/modules/company/models/company-model";
import { PlantResponseDto } from "@/modules/plant/models/plant-model";

const BASE_URL = "/users";

class UserService {

  getAssignedPlants = async (): Promise<PlantResponseDto[]> => {
    return await axiosRequest.get(`${BASE_URL}/plants`);
  };

  getAssignedCompany = async (): Promise<CompanyResponseDto> => {
    return await axiosRequest.get(`${BASE_URL}/company`);
  };
}

export const userService = new UserService();
