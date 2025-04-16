import FlexContainer from "@/components/custom/flex-container/flex-container";
import useCustomForm from "@/components/custom/form/hooks/use-custom-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Pen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCreateUser, useUpdateUser } from "../handlers/user-handler";
import { UserRequestDto, UserResponseDto } from "../models/user-model";

interface UserRequestSheetProps {
  user?: UserResponseDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  requestType?: "create" | "update";
}

const sheetText = {
  create: {
    title: "Create user",
    description: "Create a new user with the details below. Click save when youre done.",
  },
  update: {
    title: "User details",
    description: "Make changes to the user here. Click save when youre done.",
  },
};

const UserRequestSheet = ({
  user,
  open,
  onOpenChange,
  requestType = "create",
}: UserRequestSheetProps) => {
  const [editMode, setEditMode] = useState(false);

  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const { form, renderField, resetForm, fields } = useCustomForm<UserRequestDto>({
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "User name",
        defaultValue: user?.name,
        disabled: !editMode && requestType !== "create",
        validations: {
          required: { value: true, message: "Name is required" },
          minLength: { value: 2, message: "Name must be at least 2 characters" },
          maxLength: { value: 50, message: "Name must be at most 50 characters" },
        },
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "User email",
        defaultValue: user?.email,
        disabled: !editMode && requestType !== "create",
        validations: {
          required: { value: true, message: "Email is required" },
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Email must be a valid address",
          },
        },
      },
      {
        name: "role_id",
        label: "Role",
        type: "select",
        placeholder: "User role",
        options: [
          { value: "rol_j7iXqrWyAgIoJSTm", label: "Plant Manager" },
          { value: "rol_7iVeknbdU4PCDZor", label: "Supervisor" },
          { value: "rol_dqX48DKzG2ve0KLY", label: "Operator" },
        ],
        defaultValue: user?.role,
        disabled: !editMode && requestType !== "create",
        validations: {
          required: { value: true, message: "Role is required" },
        },
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "User password",
        hideField: !editMode && requestType !== "create",
        validations: {
          required: { value: true, message: "Password is required" },
          minlength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
          maxlength: {
            value: 72,
            message: "Password must be at most 72 characters",
          },
          pattern: {
            // At least 1 lowercase, 1 uppercase, 1 number
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            message: "Password must contain uppercase, lowercase letters and a number",
          },
        },
      },
      {
        name: "confirmPassword",
        label: "Confirm password",
        type: "password",
        placeholder: "Confirm password",
        hideField: !editMode && requestType !== "create",
        validations: {
          required: { value: true, message: "Please confirm your password" },
          custom: [
            {
              value: ({ password, confirmPassword }) => password === confirmPassword,
              message: "Passwords do not match",
            },
          ],
        },
      },
    ],
  });

  const onSubmit = (values: any) => {
    switch (requestType) {
      case "create":
        createUser(
          { ...values, confirmPassword: undefined },
          {
            onSuccess: () => {
              resetForm();
            },
            onError: (error) => {
              console.error("Error creating user:", error);
            },
          }
        );

      case "update":
        if (user) {
          updateUser(
            { id: user?.id, data: { ...values, confirmPassword: undefined } },
            {
              onSuccess: () => {
                setEditMode(false);
              },
              onError: (error) => {
                console.error("Error updating user:", error);
              },
            }
          );
        }
    }
  };

  const handleSubmit = form.handleSubmit((values) => onSubmit(values));

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        onOpenChange?.(open);
        if (!open) {
          setTimeout(() => {
            resetForm();
            setEditMode(false);
          }, 300);
        }
      }}
    >
      <SheetContent className="gap-0 px-2" onOpenAutoFocus={(e) => e.preventDefault()}>
        <SheetHeader>
          <SheetTitle>{sheetText[requestType].title}</SheetTitle>
          <SheetDescription>{sheetText[requestType].description}</SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <Separator />
        </div>
        <FlexContainer className="gap-4 p-4">
          {user && (
            <Image
              src={user.image}
              alt={user.name}
              width={100}
              height={100}
              className="rounded-full object-cover mb-4"
            />
          )}
          <Form {...form}>
            <form id="user-form" onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              {fields.map((field) => {
                return (
                  <FormField
                    key={field.name}
                    name={field.name}
                    control={form.control}
                    render={() => (
                      <FormItem
                        className={`transition-all ${
                          field.hideField
                            ? "opacity-0 pointer-events-none"
                            : "opacity-100 pointer-events-auto"
                        }`}
                      >
                        {field.label && <FormLabel htmlFor={field.name}>{field.label}</FormLabel>}
                        <FormControl>
                          {renderField(
                            field,
                            "w-full transition-all disabled:cursor-default disabled:opacity-75"
                          )}
                        </FormControl>
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
            </form>
          </Form>
        </FlexContainer>
        <SheetFooter>
          {editMode ? (
            <div className="grid grid-cols-2 w-full gap-4">
              <Button
                variant={"secondary"}
                type="button"
                onClick={() => setEditMode(false)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button type="submit" form="user-form" disabled={isUpdating}>
                Save
              </Button>
            </div>
          ) : requestType === "create" ? (
            <Button type="submit" form="user-form" disabled={isCreating}>
              Save
            </Button>
          ) : (
            <Button type="button" onClick={() => setEditMode(true)} form="user-form">
              <Pen /> Edit details
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UserRequestSheet;
