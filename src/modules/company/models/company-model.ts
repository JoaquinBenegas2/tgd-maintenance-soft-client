import { UserResponseDto } from "@/modules/user/models/user-model";

export interface CompanyResponseDto {
  id: string;
  name: string;
  assigned_users: UserResponseDto[];
}
