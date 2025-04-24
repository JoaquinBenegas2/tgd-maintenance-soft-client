import { MaintenanceTypeResponseDto } from "@/modules/maintenance-type/models/maintenance-type-model";

export enum FormFieldType {
  TEXT = "TEXT",
  TEXTAREA = "TEXTAREA",
  NUMBER = "NUMBER",
  DATE = "DATE",
  SELECT = "SELECT",
  CHECKBOX = "CHECKBOX",
  COMBOBOX = "COMBOBOX",
  RADIO = "RADIO",
  FILE = "FILE",
}

export interface FormOptionResponseDto {
  id: number;
  value: string;
}

export interface FormFieldResponseDto {
  id: number;
  name: string;
  type: FormFieldType;
  required: boolean;
  order: number;
  options: FormOptionResponseDto[];
}

export interface FormRequestDto {
  name: string;
}

export interface FormResponseDto {
  id: number;
  name: string;
  description: string;
  maintenance_type: MaintenanceTypeResponseDto;
  fields: FormFieldResponseDto[];
}

export interface FormWithoutMaintenanceTypeResponseDto {
  id: number;
  name: string;
  description: string;
  fields: FormFieldResponseDto[];
}
