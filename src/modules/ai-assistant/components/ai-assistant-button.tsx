import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import WithPermission from "@/components/with-permission/with-permission";

interface AIAssistantButtonProps {
  onClick: () => void;
}

export default function AIAssistantButton({ onClick }: AIAssistantButtonProps) {
  return (
    <WithPermission roles={["PLANT_MANAGER", "PLANT_SUPERVISOR"]}>
      <Button
        onClick={onClick}
        className="fixed bottom-2 right-2 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary"
        aria-label="Open AI Assistant"
      >
        <Bot className="w-6 h-6 text-white" />
      </Button>
    </WithPermission>
  );
}
