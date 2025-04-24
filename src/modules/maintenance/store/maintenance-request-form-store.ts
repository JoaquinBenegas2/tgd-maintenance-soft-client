import { FormWithoutMaintenanceTypeResponseDto } from "@/modules/maintenance-form/models/maintenance-form-model";
import { MaintenanceTypeWithFormsResponseDto } from "@/modules/maintenance-type/models/maintenance-type-model";
import { create } from "zustand";
import { MaintenanceAnswerRequestDto } from "../models/maintenance-model";
import { format } from "date-fns";

interface MaintenanceRequestFormStore {
  maintenance_date: string;
  selectedMaintenanceType: MaintenanceTypeWithFormsResponseDto | null;
  selectedForm: FormWithoutMaintenanceTypeResponseDto | null;
  answers: MaintenanceAnswerRequestDto[];
  setMaintenanceData: (data: Partial<MaintenanceRequestFormStore>) => void;
  reset: () => void;
}

const initialState: MaintenanceRequestFormStore = {
  maintenance_date: format(new Date(), "yyyy-MM-dd"),
  selectedMaintenanceType: null,
  selectedForm: null,
  answers: [],
  setMaintenanceData: () => {},
  reset: () => {},
};

export const useMaintenanceFormStore = create<MaintenanceRequestFormStore>((set) => ({
  ...initialState,

  setMaintenanceData: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  reset: () =>
    set({
      ...initialState,
      maintenance_date: format(new Date(), "yyyy-MM-dd"),
    }),
}));
