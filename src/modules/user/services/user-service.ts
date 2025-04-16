import { axiosRequest } from "@/lib/axios/config/axios-config";
import { GenericService } from "@/lib/react-query/services/generic-service";
import { CompanyResponseDto } from "@/modules/company/models/company-model";
import { PlantResponseDto } from "@/modules/plant/models/plant-model";
import { UserRequestDto, UserResponseDto } from "../models/user-model";

const BASE_URL = "/users";

class UserService extends GenericService<UserRequestDto, UserResponseDto> {
  constructor() {
    super(BASE_URL);
  }

  getAssignedPlants = async (): Promise<PlantResponseDto[]> => {
    return await axiosRequest.get(`${BASE_URL}/plants`);
  };

  getAssignedCompany = async (): Promise<CompanyResponseDto> => {
    return await axiosRequest.get(`${BASE_URL}/company`);
  };
}

export const userService = new UserService();
