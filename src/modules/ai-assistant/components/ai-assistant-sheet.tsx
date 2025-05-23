"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMessage, useAiGeneration } from "../hooks/use-ai-generation";
import { AIQuery } from "../models/ai-assistant";

interface AIAssistantSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const queryOptions: AIQuery[] = [{ type: "daily-summary", label: "Resumen técnico diario" }];

export default function AIAssistantSheet({ open, onOpenChange }: AIAssistantSheetProps) {
  const { messages, run, isLoading } = useAiGeneration();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[95%] sm:max-w-[640px]">
        <SheetHeader>
          <SheetTitle>Asistente IA</SheetTitle>
          <SheetDescription>
            Herramienta que utiliza IA para responder a tus preguntas y ayudarte con el
            mantenimiento de tu planta.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-9rem)] gap-4 mt-2 px-4">
          <div className="flex-grow overflow-hidden relative">
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent z-10" />
            <ScrollArea className="h-full pr-4">
              <div className="flex flex-col gap-4 mb-12">
                {messages.map(
                  (m: ChatMessage, i: number) =>
                    m.content && (
                      <div
                        key={i}
                        className={`
                      p-4 rounded-lg
                      ${
                        m.role === "user"
                          ? "self-end bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-muted text-neutral-800 dark:text-neutral-200"
                      }
                    `}
                      >
                        <div className="prose prose-sm max-w-none text-sm markdown-custom-list">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({ children }) => (
                                <h1 className="text-xl font-bold">{children}</h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="text-lg font-bold mt-4">{children}</h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-sm font-bold mt-4">{children}</h3>
                              ),
                              hr: () => (
                                <hr className="my-4 border-neutral-300 dark:border-neutral-700" />
                              ),
                              li: ({ children }) => (
                                <li className="list-disc list-inside pl-4">{children}</li>
                              ),
                            }}
                          >
                            {m.content.trim()}
                          </ReactMarkdown>
                        </div>
                        {m.type === "daily-summary" && m.role === "assistant" && !isLoading && (
                          <Button
                            variant={"secondary"}
                            size="sm"
                            className="mt-6"
                            onClick={() =>
                              run("Ver más recomendaciones", "improvement-suggestions", m.content)
                            }
                          >
                            Ver más recomendaciones
                          </Button>
                        )}
                      </div>
                    )
                )}
                <div ref={endRef} />
              </div>
            </ScrollArea>
          </div>

          {/* Botones de consulta */}
          <div className="flex flex-col gap-2 pt-4">
            {queryOptions.map((query) => (
              <Button
                key={query.type}
                variant="secondary"
                onClick={() => run(query.label, query.type)}
                disabled={isLoading}
              >
                {query.label}
              </Button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
