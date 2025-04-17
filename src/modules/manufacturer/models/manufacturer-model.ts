export interface ManufacturerRequestDto {
  name: string
  country: string
}

export interface ManufacturerResponseDto {
  id: number
  name: string
  country: string
  active: boolean
}