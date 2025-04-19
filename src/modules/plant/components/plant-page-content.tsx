import Plant from "@/assets/svg/plant.svg";
import FlexContainer from "@/components/custom/flex-container/flex-container";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import AvailablePlants from "./available-plants";

export default function PlantPageContent() {
  return (
    <>
      <Card className="min-h-64 relative">
        {/* Text */}
        <CardContent className="justify-center">
          <FlexContainer direction="col" gap={2} wrap="nowrap">
            <CardTitle
              className="text-3xl font-normal text-primary"
              style={{
                background:
                  "linear-gradient(45deg, #003076 0%, #0051c7 100%)",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
              }}
            >
              Welcome back, <span className="font-bold">User Name</span>!
            </CardTitle>
            <CardDescription className="text-xl">
              Here you can handle your plants. Select one to continue!
            </CardDescription>
          </FlexContainer>
        </CardContent>

        {/* Image */}
        <Image
          src={Plant}
          alt="Plant"
          width={400}
          className="hidden absolute bottom-0 right-0 translate-y-15 xl:block"
        ></Image>
      </Card>

      <AvailablePlants />
    </>
  );
}
