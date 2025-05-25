import { useParams } from "next/navigation";

export const usePlantPath = (): string | null => {
  const params = useParams();
  const plant = params.plant;

  if (!plant || typeof plant !== "string") {
    return null;
  }

  return `/${plant}`;
};
