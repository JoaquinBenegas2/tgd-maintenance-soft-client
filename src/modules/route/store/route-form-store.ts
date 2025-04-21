
import { create } from "zustand";
import { RouteRequestDto } from "../models/route-model";

interface RouteFormStore extends RouteRequestDto {
  setRouteData: (data: Partial<RouteRequestDto>) => void;
  reset: () => void;
}

export const useRouteFormStore = create<RouteFormStore>((set) => ({
  name: "",
  description: "",
  periodicity_in_days: 1,
  start_date: new Date().toISOString().substring(0, 10),
  element_ids: [],
  operator_ids: [],
  setRouteData: (data) => set((state) => ({ ...state, ...data })),
  reset: () =>
    set({
      name: "",
      description: "",
      periodicity_in_days: 1,
      start_date: new Date().toISOString().substring(0, 10),
      element_ids: [],
      operator_ids: [],
    }),
}));
