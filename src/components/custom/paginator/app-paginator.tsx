"use client";

import React, { useEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type PaginatorProps = {
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  pageSizeOptions: number[];
  onPageChange: (pageNumber: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function Paginator({
  pageIndex,
  pageCount,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: PaginatorProps) {
  const [inputValue, setInputValue] = useState(pageIndex.toString());

  // Sincronizar el estado local del input con el pageIndex
  useEffect(() => {
    setInputValue(pageIndex.toString());
  }, [pageIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputValidation = () => {
    const page = Number(inputValue);
    if (!isNaN(page) && page >= 1 && page <= pageCount) {
      onPageChange(page);
    } else {
      // Si el valor no es válido, vuelve al valor actual
      setInputValue(pageIndex.toString());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputValidation();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-between">
      {/* Page Size Selector */}
      <div className="flex items-center gap-2">
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className="h-8 w-full sm:w-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Elementos por página</SelectLabel>
              {pageSizeOptions?.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  <span className="mr-2">{option}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Pagination Controls */}
      <Pagination className="w-auto mx-0">
        <PaginationContent className="flex items-center gap-2 w-full">
          {/* Previous Button */}
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={() => onPageChange(pageIndex - 1)}
              disabled={pageIndex <= 1}
              className="border-1 border-input md:border-none"
            >
              <ChevronLeft />
            </Button>
          </PaginationItem>

          {/* Page Input */}
          <PaginationItem className="flex items-center w-full">
            <Input
              type="number"
              min={1}
              max={pageCount}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputValidation} // Validar al perder el foco
              onKeyDown={handleKeyDown} // Validar al presionar Enter
              className="w-full md:w-16 h-8 text-center border rounded px-2"
            />
            <div className="flex mx-4">
              <span>/</span>
              <span className="ml-2">{pageCount}</span>
            </div>
          </PaginationItem>

          {/* Next Button */}
          <PaginationItem>
            <Button
              variant="ghost"
              className="border-1 border-input md:border-none"
              onClick={() => onPageChange(pageIndex + 1)}
              disabled={pageIndex >= pageCount}
            >
              <ChevronRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
