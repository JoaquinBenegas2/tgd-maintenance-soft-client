import { useCustomMutation } from "@/lib/react-query/custom/custom-query";
import { createReactQueryHandlers } from "@/lib/react-query/query-handler/create-query-handlers";
import { RouteResponseDto } from "../models/route-model";
import { routeService } from "../services/route-service";

const QUERY_KEY = "routes";

export const {
  useGetAll: useGetAllRoutes,
  useGetById: useGetRouteById,
  useCreate: useCreateRoute,
  useUpdate: useUpdateRoute,
  useDelete: useDeleteRoute,
} = createReactQueryHandlers(routeService, QUERY_KEY);

export const useAssignUserToRoute = () => {
  return useCustomMutation<RouteResponseDto, { routeId: number; userId: number }>(
    [QUERY_KEY],
    ({ routeId, userId }) => routeService.assignUserToRoute(routeId, userId)
  );
};

export const useUnassignUserFromRoute = () => {
  return useCustomMutation<RouteResponseDto, { routeId: number; userId: number }>(
    [QUERY_KEY],
    ({ routeId, userId }) => routeService.unassignUserFromRoute(routeId, userId)
  );
};


export const useAssignElementToRoute = () => {
  return useCustomMutation<RouteResponseDto, { routeId: number; elementId: number }>(
    [QUERY_KEY],
    ({ routeId, elementId }) => routeService.assignElementToRoute(routeId, elementId)
  );
};

export const useUnassignElementFromRoute = () => {
  return useCustomMutation<RouteResponseDto, { routeId: number; elementId: number }>(
    [QUERY_KEY],
    ({ routeId, elementId }) => routeService.unassignElementFromRoute(routeId, elementId)
  );
};

