"use client";

import { usePlantStore } from "@/stores/selected-plant-store";
import { useSession } from "next-auth/react";
import { useCallback, useRef, useState } from "react";
import { QueryType } from "../models/ai-assistant";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  type?: QueryType;
};

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useAiGeneration = () => {
  const { data: session } = useSession();
  const selectedPlant = usePlantStore((s) => s.selectedPlant);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const abortController = useRef<AbortController | null>(null);

  const run = useCallback(
    async (label: string, type?: QueryType, body?: any) => {
      abortController.current?.abort();
      const controller = new AbortController();
      abortController.current = controller;

      setIsLoading(true);
      setMessages((prev) => [
        ...prev,
        { role: "user", content: label, type },
        { role: "assistant", content: "", type },
      ]);

      try {
        const res = await fetch(`${apiUrl}/ai-generation/${type}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: session?.accessToken ? `Bearer ${session.accessToken}` : "",
            "x-plant-id": selectedPlant?.id?.toString() ?? "",
          },
          body: body ? JSON.stringify(body) : null,
          // There is no body real: the backend builds the prompt with plantId
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const reader = res.body!.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();

          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const parts = buffer.split("\n\n");
          buffer = parts.pop()!;

          for (const part of parts) {
            const trimmed = part.trim();

            if (!trimmed) continue;

            const raw = trimmed.startsWith("data:") ? trimmed.slice("data:".length) : trimmed;

            if (raw === "[DONE]") break;

            let content = "";
            try {
              const { content: chunk } = JSON.parse(raw) as ChatMessage;
              content += chunk;
            } catch (e) {
              console.error("Error parsing chunk:", trimmed, e);
            }

            setMessages((prev) => {
              const copy = [...prev];
              const lastIndex = copy.length - 1;
              copy[lastIndex] = {
                ...copy[lastIndex],
                content: copy[lastIndex].content + content,
              };
              return copy;
            });
          }
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [session?.accessToken, selectedPlant?.id]
  );

  return { messages, run, isLoading };
};
