import { useParams } from "next/navigation";

export const usePlantPath = (): string => {
  const params = useParams();
  const plant = params.plant;

  if (!plant || typeof plant !== "string") {
    throw new Error("Plant slug is missing from route params.");
  }

  return `/${plant}`;
};
