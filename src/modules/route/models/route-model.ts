import { ElementResponseDto, ProgressElementResponseDto } from "@/modules/element/models/element-model";
import { UserResponseDto } from "@/modules/user/models/user-model";

export enum RouteStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface RouteRequestDto {
  name: string;
  description: string;
  periodicity_in_days: number;
  start_date: string;
  element_ids: number[];
  operator_ids: number[];
}

export interface RouteResponseDto {
  id: number;
  name: string;
  description: string;
  periodicity_in_days: number;
  start_date: string;
  status: RouteStatusEnum;
  assigned_elements: ElementResponseDto[];
  assigned_operators: UserResponseDto[];
}

export interface ProgressRouteResponseDto {
  id: number;
  name: string;
  description: string;
  periodicity_in_days: number;
  start_date: string;
  status: RouteStatusEnum;
  assigned_elements: ProgressElementResponseDto[];
  assigned_operators: UserResponseDto[];
}
