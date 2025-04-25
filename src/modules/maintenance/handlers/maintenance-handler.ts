import { createReactQueryHandlers } from "@/lib/react-query/query-handler/create-query-handlers";
import { maintenanceService } from "../services/maintenance-service";
import { useCustomQuery } from "@/lib/react-query/custom/custom-query";
import { MaintenanceResponseDto } from "../models/maintenance-model";
import { getMonth, parseISO } from "date-fns";

const QUERY_KEY = "maintenances";

export const {
  useGetAll: useGetAllMaintenances,
  useGetById: useGetMaintenanceById,
  useCreate: useCreateMaintenance,
  useUpdate: useUpdateMaintenance,
  useDelete: useDeleteMaintenance,
} = createReactQueryHandlers(maintenanceService, QUERY_KEY);

export const useGetMonthMaintenances = () => {
  return useCustomQuery<MaintenanceResponseDto[]>(
    [QUERY_KEY, "month"],
    () => maintenanceService.getAll(),
    {
      select: (data) => {
        const currentMonth = getMonth(new Date());

        return data.filter((item) => {
          const itemDate = parseISO(item.maintenance_date);
          return getMonth(itemDate) === currentMonth;
        });
      },
    }
  );
};
