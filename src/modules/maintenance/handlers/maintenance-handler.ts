import { useCustomMutation, useCustomQuery } from "@/lib/react-query/custom/custom-query";
import { createReactQueryHandlers } from "@/lib/react-query/query-handler/create-query-handlers";
import { format, getMonth, parseISO } from "date-fns";
import { toast } from "sonner";
import { MaintenanceAnswerRequestDto, MaintenanceResponseDto } from "../models/maintenance-model";
import { maintenanceService } from "../services/maintenance-service";

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

interface MaintenanceUpdateRequestDto {
  answers: MaintenanceAnswerRequestDto[];
}

export const useUpdateMaintenanceAnswers = () => {
  return useCustomMutation<
    MaintenanceResponseDto,
    { id: number; data: MaintenanceUpdateRequestDto }
  >(
    [QUERY_KEY],
    ({ id, data }: { id: number; data: MaintenanceUpdateRequestDto }) =>
      maintenanceService.updateMaintenanceAnswers(id, data),
    {
      onSuccess: () => {
        toast.success("Answers updated successfully");
      },
    }
  );
};

export const useGetMaintenancesByElement = (elementId: number, dateFrom: Date, dateTo: Date) => {
  const df = format(dateFrom, "yyyy-MM-dd");
  const dt = format(dateTo, "yyyy-MM-dd");
  return useCustomQuery<MaintenanceResponseDto[]>(
    ["maintenances", "element", elementId, df, dt],
    () => maintenanceService.getByElementAndDateRange(elementId, df, dt),
    { enabled: Boolean(elementId) }
  );
};

export const useGetMaintenancesByComponent = (
  componentId: number,
  dateFrom: Date,
  dateTo: Date
) => {
  const df = format(dateFrom, "yyyy-MM-dd");
  const dt = format(dateTo, "yyyy-MM-dd");
  return useCustomQuery<MaintenanceResponseDto[]>(
    ["maintenances", "component", componentId, df, dt],
    () => maintenanceService.getByComponentAndDateRange(componentId, df, dt),
    { enabled: Boolean(componentId) }
  );
};

export const useGetMaintenancesByAsset = (assetId: number, dateFrom: Date, dateTo: Date) => {
  const df = format(dateFrom, "yyyy-MM-dd");
  const dt = format(dateTo, "yyyy-MM-dd");
  return useCustomQuery<MaintenanceResponseDto[]>(
    ["maintenances", "asset", assetId, df, dt],
    () => maintenanceService.getByAssetAndDateRange(assetId, df, dt),
    { enabled: Boolean(assetId) }
  );
};
