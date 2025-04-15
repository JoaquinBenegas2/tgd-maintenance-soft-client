import FlexContainer from "@/components/custom/flex-container/flex-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { UserResponseDto } from "../models/user-model";
import UserDetailSheet from "./user-detail-sheet";

interface UserCardProps {
  user: UserResponseDto;
}

const roleClasses = {
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

export default function UserCard({ user }: UserCardProps) {
  const roleStyle = roleClasses[user.role as keyof typeof roleClasses];

  return (
    <>
      <Sheet>
        <Card className="relative">
          <CardContent className="flex flex-row gap-4">
            <FlexContainer align="center" wrap="nowrap">
              <Image
                src={user.image}
                alt={user.name}
                width={50}
                height={50}
                className="rounded-full h-24 min-w-24 object-cover"
              />
              <FlexContainer direction="col" justify="center" gap={0}>
                <p className="font-bold">{user.name}</p>
                <p className="text-foreground/50 mb-4">{user.email}</p>
                <FlexContainer gap={2}>
                  <Badge
                    key={user.role}
                    className={cn("transition-all", roleStyle.bg, roleStyle.hover)}
                  >
                    {user.role}
                  </Badge>
                </FlexContainer>
              </FlexContainer>
            </FlexContainer>
          </CardContent>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-5 right-4 text-foreground/50 rounded-full"
                  >
                    <PiDotsThreeVerticalBold className="scale-125" />
                  </Button>
                </SheetTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>View user details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Card>
        <UserDetailSheet />
      </Sheet>
    </>
  );
}
