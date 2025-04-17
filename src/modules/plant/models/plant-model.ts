import { UserResponseDto } from "@/modules/user/models/user-model";

export interface PlantResponseDto {
  id: number;
  name: string;
  location: string;
  assigned_users: UserResponseDto[];
}
