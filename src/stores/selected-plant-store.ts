import { queryClient } from "@/providers/providers";
import { deleteCookie, setCookie } from "cookies-next";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Plant {
  id: number;
  name: string;
}

interface PlantStore {
  selectedPlant: Plant | null;
  setSelectedPlant: (plant: Plant, onSuccessRedirect?: (plantSlug: string) => void) => void;
  clearSelectedPlant: (onExitRedirect?: () => void) => void;
}

export const usePlantStore = create<PlantStore>()(
  persist(
    (set) => ({
      selectedPlant: null,
      setSelectedPlant: (plant, onSuccessRedirect) => {
        const plantSlug = plant.name.toLowerCase().replace(" ", "-");

        set({ selectedPlant: plant });
        setCookie("plant-slug", plantSlug);

        queryClient.removeQueries();

        onSuccessRedirect?.(plantSlug);
      },
      clearSelectedPlant: (onExitRedirect) => {
        set({ selectedPlant: null });
        deleteCookie("plant-slug");

        onExitRedirect?.();
      },
    }),
    { name: "selected-plant" }
  )
);
