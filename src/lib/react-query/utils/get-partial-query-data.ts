import { QueryClient, QueryKey } from "@tanstack/react-query";

export const getPartialQueryData = (queryKey: QueryKey, queryClient: QueryClient) => {
  return queryClient.getQueriesData({ queryKey })[0][1];
};
