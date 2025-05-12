"use client";

import { useState } from "react";
import AIAssistantButton from "./ai-assistant-button";
import AIAssistantSheet from "./ai-assistant-sheet";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AIAssistantButton onClick={() => setIsOpen(true)} />
      <AIAssistantSheet open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
} 