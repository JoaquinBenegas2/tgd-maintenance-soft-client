import { FormWithoutMaintenanceTypeResponseDto } from "@/modules/maintenance-form/models/maintenance-form-model"

export interface MaintenanceTypeRequestDto {
  name: string
  description: string
}

export interface MaintenanceTypeResponseDto {
  id: number
  name: string
  description: string
}

export interface MaintenanceTypeWithFormsResponseDto {
  id: number
  name: string
  description: string
  forms: FormWithoutMaintenanceTypeResponseDto[]
}