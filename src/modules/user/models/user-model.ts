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

export const roleNames = {
  PLANT_MANAGER: "Plant Manager",
  PLANT_SUPERVISOR: "Supervisor",
  PLANT_OPERATOR: "Operator",
};

export const roleClasses = {
  PLANT_MANAGER: {
    bg: "bg-primary",
    hover: "hover:bg-primary/80",
  },
  PLANT_OPERATOR: {
    bg: "bg-sidebar-primary",
    hover: "hover:bg-sidebar-primary/80",
  },
  PLANT_SUPERVISOR: {
    bg: "bg-red-600",
    hover: "hover:bg-red-600/80",
  },
} as const;

export const roleValues = {
  PLANT_MANAGER: "rol_j7iXqrWyAgIoJSTm",
  PLANT_SUPERVISOR: "rol_7iVeknbdU4PCDZor",
  PLANT_OPERATOR: "rol_dqX48DKzG2ve0KLY",
};
