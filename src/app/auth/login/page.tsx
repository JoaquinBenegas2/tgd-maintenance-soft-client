import ColorIsoType from "@/assets/svg/color-isotype.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInButton } from "@/modules/auth/components/sign-in-button";
import Image from "next/image";
import LoginBackgroundImage from "@/assets/images/login-bg.png";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo con estilos */}
      <div
        className="absolute inset-0 bg-cover bg-center filter grayscale z-0 opacity-40"
        style={{ backgroundImage: `url(${LoginBackgroundImage.src})` }}
      />

      {/* Contenido por encima */}
      <div className="z-10 w-[420px]">
        <Card>
          <CardHeader className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-2">
              <Image src={ColorIsoType} alt={"logo"} width={128} height={128} />
              <CardTitle className="text-2xl text-primary border-b-3 border-orange-300 pb-1 mb-3">
                TGD MAINTENANCE SOFT
              </CardTitle>
            </div>
            <CardDescription>Log in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <SignInButton className="w-full cursor-pointer" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <p>TGD S.A © - 35 YEARS 1990 - 2025</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
