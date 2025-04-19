import { ComponentResponseDto } from "@/modules/component/models/component-model";
import { ManufacturerResponseDto } from "@/modules/manufacturer/models/manufacturer-model";

export enum ElementStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface ElementRequestDto {
  name: string;
  description: string;
  component_id: number;
  manufacturer_id: string;
}

export interface ElementResponseDto {
  id: number;
  name: string;
  description: string;
  component: ComponentResponseDto;
  manufacturer: ManufacturerResponseDto;
  last_maintenance_date: string;
  last_replacement_date: string;
  status: ElementStatusEnum;
}
