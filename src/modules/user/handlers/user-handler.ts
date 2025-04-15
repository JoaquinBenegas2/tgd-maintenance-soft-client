import { useCustomQuery } from "@/lib/react-query/custom/custom-query";
import { CompanyResponseDto } from "@/modules/company/models/company-model";
import { PlantResponseDto } from "@/modules/plant/models/plant-model";
import { userService } from "@/modules/user/services/user-service";

const QUERY_KEY = "users";

export const useGetAssignedPlants = () => {
  return useCustomQuery<PlantResponseDto[]>([QUERY_KEY, "assigned-plants"], () =>
    userService.getAssignedPlants()
  );
};

export const useGetAssignedCompany = () => {
  return useCustomQuery<CompanyResponseDto>([QUERY_KEY, "company"], () =>
    userService.getAssignedCompany()
  );
};
