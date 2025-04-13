import { UseQueryOptions } from "@tanstack/react-query";

type FilterableOptions = {
  filterable: true;
  debounce?: number;
};

type NonFilterableOptions = {
  filterable?: false;
  debounce?: never;
};

type PaginationOptions = {
  pageSize?: number;
  pageIndex?: number;
};

export type GetAllOptions<ResponseDto> = {
  cancelable?: boolean;
  pagination?: PaginationOptions;
  queryOptions?: Omit<UseQueryOptions<ResponseDto, Error, ResponseDto>, "queryKey" | "queryFn"> & {
    onSuccess?: (data: ResponseDto) => void;
  };
} & (FilterableOptions | NonFilterableOptions);
