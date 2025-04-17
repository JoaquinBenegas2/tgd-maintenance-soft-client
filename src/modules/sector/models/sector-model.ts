export interface SectorRequestDto {
  name: string
  description: string
}

export interface SectorResponseDto {
  id: number
  name: string
  description: string
  active: boolean
}