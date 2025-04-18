"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { ButtonHTMLAttributes, ReactElement } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { COLUMN_SPANS } from "./constants/constants";
import { FormFieldConfig } from "./models/custom-form-models";

interface CustomFormProps {
  form: UseFormReturn;
  formId?: string;
  fields: FormFieldConfig[];
  formColumns?: number;
  renderField: (field: FormFieldConfig, className?: string) => React.JSX.Element | null;
  gridColumnClass?: string;
  onSubmit: (values: Record<string, any>) => void;
  submitButton?: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;
  showSubmitButton?: boolean;
}

export default function CustomForm({
  form,
  formId,
  fields,
  formColumns,
  renderField,
  gridColumnClass,
  onSubmit,
  submitButton,
  showSubmitButton = true,
}: CustomFormProps) {
  const handleSubmit = form.handleSubmit((values) => onSubmit(values));

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={handleSubmit}
        className={`grid w-full ${gridColumnClass} -grid-cols-12 gap-4`}
      >
        {fields.map((field) => {
          const fieldSpan = (field.fieldSpan as keyof typeof COLUMN_SPANS) || formColumns || 1;
          const spanClass = COLUMN_SPANS[fieldSpan];

          const className = form.formState.errors[field.name] ? "border-red-600" : "";
          return (
            <FormField
              key={field.name}
              name={field.name}
              control={form.control}
              render={() => (
                <FormItem className={spanClass}>
                  {field.type === "checkbox" ? (
                    <div className="flex items-center space-x-2">
                      <FormControl>{renderField(field)}</FormControl>
                      {field.label && <FormLabel htmlFor={field.name}>{field.label}</FormLabel>}
                    </div>
                  ) : (
                    <>
                      {field.label && <FormLabel htmlFor={field.name}>{field.label}</FormLabel>}
                      <FormControl>{renderField(field, className)}</FormControl>
                    </>
                  )}

                  {form.formState.errors[field.name] && (
                    <FormMessage>
                      {form.formState.errors[field.name]?.message?.toString()}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          );
        })}
        {showSubmitButton &&
          (submitButton ? (
            React.isValidElement(submitButton) &&
            React.cloneElement(submitButton, {
              type: submitButton.props.type || "submit",
            })
          ) : (
            <Button type="submit">Submit</Button>
          ))}
      </form>
    </Form>
  );
}
