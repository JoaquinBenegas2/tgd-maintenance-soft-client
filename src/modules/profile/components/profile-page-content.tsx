"use client";

import PageHeader from "@/components/custom/page/app-page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Shield, User, UserIcon } from "lucide-react";
import { AppUser } from "../../../../next-auth";

interface ProfilePageContentProps {
  user: AppUser;
}

const getRoleDisplayName = (role: string) => {
  const roleMap: Record<string, string> = {
    PLANT_MANAGER: "Plant Manager",
    PLANT_OPERATOR: "Operator",
    PLANT_SUPERVISOR: "Supervisor",
  };
  return roleMap[role] || role;
};

const getRoleBadgeVariant = (role: string) => {
  const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    PLANT_MANAGER: "default",
    PLANT_OPERATOR: "destructive",
    PLANT_SUPERVISOR: "secondary",
  };
  return variantMap[role] || "outline";
};

export default function ProfilePageContent({ user }: ProfilePageContentProps) {
  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <>
      <PageHeader
        icon={<User className="w-8 h-8" />}
        title="Profile"
        description="Here you can see your profile"
      />
      <div className="space-y-6">
        {/* Main Profile Card */}
        <Card className="relative overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-card shadow-lg">
                  <AvatarImage src={user.image || ""} alt={user.name || ""} />
                  <AvatarFallback className="text-4xl font-semibold bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-card-foreground mb-2">
                    {user.name || "Usuario"}
                  </h1>
                  <div className="flex items-center justify-center gap-2 text-card-foreground/75">
                    <Mail className="h-4 w-4" />
                    <span>{user.email || "No especificado"}</span>
                  </div>
                </div>

                {user.roles && user.roles.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {user.roles.map((role) => (
                      <Badge key={role} variant={getRoleBadgeVariant(role)} className="px-3 py-1">
                        <Shield className="h-3 w-3 mr-1" />
                        {getRoleDisplayName(role)}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-sidebar-primary" />
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground/75">Complete Name</label>
                <p className="text-card-foreground/50 font-medium">{user.name || "No especificado"}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground/75">Email</label>
                <p className="text-card-foreground/50 font-medium">{user.email || "No especificado"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roles and Permissions Card */}
        {user.roles && user.roles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-sidebar-primary" />
                Roles and Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.roles.map((role) => (
                  <div
                    key={role}
                    className="flex items-center justify-between p-4 border rounded-lg bg-accent"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary/15 rounded-full flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-accent-foreground">{getRoleDisplayName(role)}</h4>
                        <p className="text-sm text-accent-foreground/50">Active role in the system</p>
                      </div>
                    </div>
                    <Badge variant={getRoleBadgeVariant(role)}>{role}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
