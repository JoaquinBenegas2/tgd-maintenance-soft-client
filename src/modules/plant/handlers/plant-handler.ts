import { useCustomMutation } from "@/lib/react-query/custom/custom-query";
import { PlantResponseDto } from "../models/plant-model";
import { plantService } from "../services/plant-service";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const QUERY_KEY = "plants";

export const useAssignUserToPlant = () => {
  const queryClient = useQueryClient();

  return useCustomMutation<PlantResponseDto, { plantId: number; userId: number }>(
    [QUERY_KEY],
    ({ plantId, userId }) => plantService.assignUserToPlant(plantId, userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("User assigned successfully");
      },
    }
  );
};

export const useUnassignUserFromPlant = () => {
  const queryClient = useQueryClient();

  return useCustomMutation<PlantResponseDto, { plantId: number; userId: number }>(
    [QUERY_KEY],
    ({ plantId, userId }) => plantService.unassignUserFromPlant(plantId, userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("User unassigned successfully");
      },
    }
  );
};
