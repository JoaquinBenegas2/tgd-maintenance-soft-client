import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setCookie, deleteCookie } from "cookies-next";

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
