"use client";

import { useDebounce } from "@/hooks/debounce/use-debounce";
import { useReducer } from "react";

interface FiltersState {
  searchTerm: string;
  filters: Record<string, any>;
}

interface FiltersStateWithDebounceDelay extends FiltersState {
  debounceDelay: number;
}

type FiltersAction =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_FILTERS"; payload: Record<string, any> };

const filtersReducer = (state: FiltersState, action: FiltersAction): FiltersState => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    default:
      return state;
  }
};

interface FiltersStateHookResult extends FiltersState {
  debouncedSearchTerm: string;
  setSearchTerm: (value: string) => void;
  setFilters: (value: Record<string, any>) => void;
}

export default function useFiltersState(
  initialState: Partial<FiltersStateWithDebounceDelay> = {}
): FiltersStateHookResult {
  const [state, dispatch] = useReducer(filtersReducer, {
    searchTerm: "",
    filters: {},
    ...initialState,
  });

  const { debounceDelay } = initialState;

  const debouncedSearchTerm = useDebounce(state.searchTerm, debounceDelay);

  const setSearchTerm = (value: string) => dispatch({ type: "SET_SEARCH_TERM", payload: value });

  const setFilters = (value: Record<string, any>) =>
    dispatch({ type: "SET_FILTERS", payload: value });

  return {
    ...state,
    debouncedSearchTerm,
    setSearchTerm,
    setFilters,
  };
}
