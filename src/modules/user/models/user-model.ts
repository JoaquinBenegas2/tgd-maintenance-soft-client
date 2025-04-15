export interface UserRequestDto {
  name: string;
  email: string;
}

export interface UserResponseDto {
  id: number;
  auth0_id: string;
  role: string;
  name: string;
  email: string;
  image: string;
}
