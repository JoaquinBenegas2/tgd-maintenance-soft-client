import { ElementResponseDto } from "@/modules/element/models/element-model";
import {
  FormFieldResponseDto,
  FormResponseDto,
} from "@/modules/maintenance-form/models/maintenance-form-model";
import { RouteResponseDto } from "@/modules/route/models/route-model";

export interface MaintenanceRequestDto {
  route_id: number;
  element_id: number;
  form_id: number;
  maintenance_date: string;
  answers: MaintenanceAnswerRequestDto[];
}

export interface MaintenanceAnswerRequestDto {
  form_field_id: number;
  value: string;
}

export interface MaintenanceResponseDto {
  id: number;
  route: RouteResponseDto;
  element: ElementResponseDto;
  form: FormResponseDto;
  maintenance_date: string;
  answers: MaintenanceAnswerResponseDto[];
}

export interface MaintenanceAnswerResponseDto {
  id: number;
  form_field: FormFieldResponseDto;
  value: string;
}
