import { FormWithoutMaintenanceTypeResponseDto } from "@/modules/maintenance-form/models/maintenance-form-model";
import { MaintenanceTypeWithFormsResponseDto } from "@/modules/maintenance-type/models/maintenance-type-model";
import { formatInTimeZone } from "date-fns-tz";
import { create } from "zustand";
import { MaintenanceAnswerRequestDto } from "../models/maintenance-model";

interface MaintenanceRequestFormStore {
  maintenance_date: string;
  selectedMaintenanceType: MaintenanceTypeWithFormsResponseDto | null;
  selectedForm: FormWithoutMaintenanceTypeResponseDto | null;
  answers: MaintenanceAnswerRequestDto[];
  setMaintenanceData: (data: Partial<MaintenanceRequestFormStore>) => void;
  reset: () => void;
}

/* const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const todayFormatted = formatInTimeZone(new Date(), timeZone, "yyyy-MM-dd"); */

const initialState: MaintenanceRequestFormStore = {
  maintenance_date: new Date().toISOString().split("T")[0],
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
      maintenance_date: new Date().toISOString().split("T")[0],
    }),
}));
