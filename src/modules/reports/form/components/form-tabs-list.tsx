import { TabsList, TabsTrigger } from "@/components/animate-ui/radix-tabs";
import { FormResponseDto } from "@/modules/maintenance-form/models/maintenance-form-model";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function FormTabsList({ forms }: { forms: FormResponseDto[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const offset = el.clientWidth * 0.7; // scroll 70% width
    el.scrollBy({ left: direction === "left" ? -offset : offset, behavior: "smooth" });
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  // Re-check when forms load/change
  useEffect(() => {
    checkScroll();
  }, [forms]);

  return (
    <div className="relative mb-2">
      {/* Overlay gradients */}
      <div
        className={`absolute inset-y-0 left-0 w-16 pointer-events-none bg-gradient-to-r from-white dark:from-black to-transparent z-10 transition-all ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-y-0 right-0 w-16 pointer-events-none bg-gradient-to-l from-white dark:from-black to-transparent z-10 transition-all ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      />

      {canScrollLeft && (
        <div
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 cursor-pointer pointer-events-auto"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        </div>
      )}

      {canScrollRight && (
        <div
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 cursor-pointer pointer-events-auto"
        >
          <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        </div>
      )}

      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hidden scroll-smooth whitespace-nowrap"
      >
        <TabsList className="inline-flex space-x-2 bg-card">
          {forms?.map((form: FormResponseDto) => (
            <TabsTrigger
              key={form.id}
              value={form.id.toString()}
              className="px-4 whitespace-nowrap"
            >
              {form.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </div>
  );
}
