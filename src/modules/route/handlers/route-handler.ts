import { useCustomMutation, useCustomQuery } from "@/lib/react-query/custom/custom-query";
import { createReactQueryHandlers } from "@/lib/react-query/query-handler/create-query-handlers";
import { ProgressRouteResponseDto, RouteResponseDto } from "../models/route-model";
import { routeService } from "../services/route-service";
import { toast } from "sonner";

const QUERY_KEY = "routes";

export const {
  useGetAll: useGetAllRoutes,
  useGetById: useGetRouteById,
  useCreate: useCreateRoute,
  useUpdate: useUpdateRoute,
  useDelete: useDeleteRoute,
} = createReactQueryHandlers(routeService, QUERY_KEY);

export const useGetTodayRoutes = () => {
  return useCustomQuery<ProgressRouteResponseDto[]>([QUERY_KEY, "today"], () =>
    routeService.getTodayRoutes()
  );
};

export const useGetWeekRoutes = () => {
  return useCustomQuery<Record<string, ProgressRouteResponseDto[]>>([QUERY_KEY, "week"], () =>
    routeService.getWeekRoutes()
  );
};

export const useGetDelayedRoutes = () => {
  return useCustomQuery<ProgressRouteResponseDto[]>([QUERY_KEY, "delayed"], () =>
    routeService.getDelayedRoutes()
  );
};

export const useAssignUserToRoute = () => {
  return useCustomMutation<RouteResponseDto, { routeId: number; userId: number }>(
    [QUERY_KEY],
    ({ routeId, userId }) => routeService.assignUserToRoute(routeId, userId),
    {
      onSuccess: () => {
        toast.success("User assigned successfully");
      },
    }
  );
};

export const useUnassignUserFromRoute = () => {
  return useCustomMutation<RouteResponseDto, { routeId: number; userId: number }>(
    [QUERY_KEY],
    ({ routeId, userId }) => routeService.unassignUserFromRoute(routeId, userId),
    {
      onSuccess: () => {
        toast.success("User unassigned successfully");
      },
    }
  );
};

export const useAssignElementToRoute = () => {
  return useCustomMutation<RouteResponseDto, { routeId: number; elementId: number }>(
    [QUERY_KEY],
    ({ routeId, elementId }) => routeService.assignElementToRoute(routeId, elementId),
    {
      onSuccess: () => {
        toast.success("Element assigned successfully");
      },
    }
  );
};

export const useUnassignElementFromRoute = () => {
  return useCustomMutation<RouteResponseDto, { routeId: number; elementId: number }>(
    [QUERY_KEY],
    ({ routeId, elementId }) => routeService.unassignElementFromRoute(routeId, elementId),
    {
      onSuccess: () => {
        toast.success("Element unassigned successfully");
      },
    }
  );
};
