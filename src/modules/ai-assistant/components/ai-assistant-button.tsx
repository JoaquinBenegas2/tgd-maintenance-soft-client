import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIAssistantButtonProps {
  onClick: () => void;
}

export default function AIAssistantButton({ onClick }: AIAssistantButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-4 right-4 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary"
      aria-label="Open AI Assistant"
    >
      <Bot className="w-6 h-6 text-white" />
    </Button>
  );
}
