"use client";

import { useReducer } from "react";

interface PaginationState {
  pageSize: number;
  pageIndex: number;
  pageCount: number;
}

type PaginationAction =
  | { type: "SET_PAGE_SIZE"; payload: number }
  | { type: "SET_PAGE_INDEX"; payload: number }
  | { type: "SET_PAGE_COUNT"; payload: number };

const paginationReducer = (state: PaginationState, action: PaginationAction): PaginationState => {
  switch (action.type) {
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.payload };
    case "SET_PAGE_INDEX":
      return { ...state, pageIndex: action.payload };
    case "SET_PAGE_COUNT":
      return { ...state, pageCount: action.payload };
    default:
      return state;
  }
};

export const usePaginationState = (initialState: Partial<PaginationState> = {}) => {
  const [state, dispatch] = useReducer(paginationReducer, {
    pageSize: initialState.pageSize || 10,
    pageIndex: initialState.pageIndex || 0,
    pageCount: 0,
  });

  return {
    ...state,
    setPageSize: (size: number) => dispatch({ type: "SET_PAGE_SIZE", payload: size }),
    setPageIndex: (index: number) => dispatch({ type: "SET_PAGE_INDEX", payload: index }),
    setPageCount: (count: number) => dispatch({ type: "SET_PAGE_COUNT", payload: count }),
  };
};
