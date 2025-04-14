import { useCustomQuery } from "@/lib/react-query/custom/custom-query";
import { PlantResponseDto } from "@/modules/plant/models/plant-model";
import { userService } from "@/modules/user/services/user-service";

const QUERY_KEY = "users";

export const useGetAssignedPlants = (id?: string) => {
  return useCustomQuery<PlantResponseDto[]>(
    [QUERY_KEY, id, "assigned-plants"],
    () => userService.getAssignedPlants(id),
    { enabled: !!id }
  );
};
