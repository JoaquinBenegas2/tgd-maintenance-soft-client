import {
  DefaultError,
  MutationFunction,
  QueryFunction,
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export type QueryOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TError = DefaultError
> = Omit<UseQueryOptions<TQueryFnData, TError, TData>, "queryKey" | "queryFn">;

// ==============================================================================================
//-- Custom Query
// ==============================================================================================
export const useCustomQuery = <
  TData = unknown,
  TQueryFnData = TData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  queryOptions?: Omit<UseQueryOptions<TQueryFnData, Error, TData, TQueryKey>, "queryKey">
) => {
  return useQuery<TQueryFnData, Error, TData, TQueryKey>({
    queryKey,
    queryFn,
    ...queryOptions,
  });
};

// ==============================================================================================
//-- Cancelable Custom Query
// ==============================================================================================
export const useCancelableCustomQuery = <
  TData = unknown,
  TQueryFnData = TData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: (context: { signal?: AbortSignal }) => Promise<TQueryFnData>,
  queryOptions?: Omit<UseQueryOptions<TQueryFnData, Error, TData, TQueryKey>, "queryKey">
) => {
  return useQuery<TQueryFnData, Error, TData, TQueryKey>({
    queryKey,
    queryFn: ({ signal }) => queryFn({ signal }),
    ...queryOptions,
  });
};

// ==============================================================================================
//-- Custom Mutation
// ==============================================================================================
export const useCustomMutation = <TData = unknown, TVariables = void>(
  queryKey: QueryKey,
  mutateFunction: MutationFunction<TData, TVariables>,
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, "mutationFn"> & {
    optimisticUpdate?: (variables: TVariables) => (prevData: any) => any;
  }
) => {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn: mutateFunction,

    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey });
      options?.onSuccess?.(...args);
    },

    onMutate: async (variables) => {
      if (options?.optimisticUpdate) {
        await queryClient.cancelQueries({ queryKey });

        const previousData = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, options.optimisticUpdate(variables));

        return { previousData };
      }
    },

    onError: (_error, _variables, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },

    ...options,
  });
};
