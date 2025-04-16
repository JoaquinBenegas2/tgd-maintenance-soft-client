export interface UserRequestDto {
  name: string;
  email: string;
  role_id: string;
  password: string;
}

export interface UserResponseDto {
  id: number;
  role: string;
  name: string;
  email: string;
  image: string;
}
