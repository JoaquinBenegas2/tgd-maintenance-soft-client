"use client";

import { useEffect } from "react";
import { useCancelableCustomQuery, useCustomMutation } from "../custom/custom-query";
import useFiltersState from "../hooks/use-filters-state";
import { usePaginationState } from "../hooks/use-pagination-state";
import { GetAllOptions } from "../models/get-all-model";
import { GetByIdOptions } from "../models/get-by-id-model";
import { GenericService } from "../services/generic-service";
import { toast } from "sonner";

interface MutationOptions<TData = unknown> {
  optimisticUpdate?: (Data: TData) => (prevData: any) => any;
}

export const createReactQueryHandlers = <Service extends GenericService<any, any>>(
  service: Service,
  key: string
) => {
  // ==============================================================================================
  //--  DTOs
  // ==============================================================================================
  type RequestDto = Parameters<Service["create"]>[0]; // Infer RequestDto from service
  type ResponseDto = Awaited<ReturnType<Service["getById"]>>; // Infer ResponseDto from service
  type PaginatedDto = Awaited<ReturnType<Service["getAll"]>>;

  // ==============================================================================================
  //-- Get All
  // ==============================================================================================
  const useGetAll = (options: GetAllOptions<PaginatedDto> = {}) => {
    //-- State:
    const { cancelable = true, filterable = true, pagination, debounce, queryOptions } = options;

    const hookFiltersState = useFiltersState({ debounceDelay: debounce });
    const hookPaginationState = usePaginationState(pagination);

    const filtersState = filterable ? hookFiltersState : null;
    const paginationState = pagination ? hookPaginationState : null;

    //-- Query:
    const queryKey: (string | number)[] = [key];

    if (filtersState) {
      queryKey.push(filtersState.debouncedSearchTerm, ...Object.values(filtersState.filters));
    }

    if (paginationState) {
      queryKey.push(paginationState.pageIndex, paginationState.pageSize);
    }

    const queryParams = {
      ...(paginationState
        ? { page: paginationState.pageIndex, size: paginationState.pageSize }
        : {}),
      ...(filtersState
        ? {
            search: debounce
              ? filtersState.debouncedSearchTerm
                ? filtersState.debouncedSearchTerm
                : undefined
              : filtersState.searchTerm
              ? filtersState.searchTerm
              : undefined,
          }
        : {}),
      ...(filtersState ? filtersState.filters : {}),
    };

    const queryFn = cancelable
      ? //* Cancelable
        ({ signal }: { signal?: AbortSignal }) => service.getAll({ signal, params: queryParams })
      : //* Non-Cancelable
        () => service.getAll({ params: queryParams });

    const query = useCancelableCustomQuery<PaginatedDto>(queryKey, queryFn, queryOptions);

    //-- Success Query:
    useEffect(() => {
      if (query.isSuccess && query.data) {
        queryOptions?.onSuccess?.(query.data);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.data, query.isSuccess]);

    //-- Return:
    return {
      ...paginationState,
      ...filtersState,
      ...query,
    };
  };

  // ==============================================================================================
  //-- Get By Id
  // ==============================================================================================
  const useGetById = (id: string | number, options: GetByIdOptions = {}) => {
    const { cancelable = true } = options;

    const queryKey = [key, id.toString()];

    const queryFn = cancelable
      ? ({ signal }: { signal?: AbortSignal }) => service.getById(id, { signal })
      : () => service.getById(id);

    const query = useCancelableCustomQuery<ResponseDto>(queryKey, queryFn);

    return query;
  };

  // ==============================================================================================
  //--  Create
  // ==============================================================================================
  const useCreate = (options?: MutationOptions<RequestDto>) => {
    return useCustomMutation<ResponseDto>([key], (data: RequestDto) => service.create(data), {
      optimisticUpdate: options?.optimisticUpdate ? options.optimisticUpdate : undefined,
      onSuccess: () => {
        toast.success("Created successfully");
      }
    });
  };

  // ==============================================================================================
  //-- Update
  // ==============================================================================================
  const useUpdate = (options?: MutationOptions<{ id: string | number; data: RequestDto }>) => {
    return useCustomMutation<ResponseDto, { id: string | number; data: RequestDto }>(
      [key],
      ({ id, data }: { id: string | number; data: RequestDto }) => service.update(id, data),
      {
        optimisticUpdate: options?.optimisticUpdate ? options.optimisticUpdate : undefined,
        onSuccess: () => {
          toast.success("Updated successfully");
        }
      }
    );
  };

  // ==============================================================================================
  //--  Delete
  // ==============================================================================================
  const useDelete = (options?: MutationOptions<string | number>) => {
    return useCustomMutation<void, string | number>(
      [key],
      (id: string | number) => service.delete(id),
      {
        optimisticUpdate: options?.optimisticUpdate ? options.optimisticUpdate : undefined,
        onSuccess: () => {
          toast.success("Deleted successfully");
        }
      }
    );
  };

  // ==============================================================================================
  //-- Return
  // ==============================================================================================
  return { useGetAll, useGetById, useCreate, useUpdate, useDelete };
};
