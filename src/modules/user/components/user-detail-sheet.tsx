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
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { UserRequestDto, UserResponseDto } from "../models/user-model";
import Image from "next/image";
import { forwardRef, useImperativeHandle } from "react";

interface UserDetailSheetProps {
  user: UserResponseDto;
}

const UserDetailSheet = forwardRef(({ user }: UserDetailSheetProps, ref) => {
  const { form, uiFields, renderField, resetForm } = useCustomForm<UserRequestDto>({
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        defaultValue: user.name,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        defaultValue: user.email,
      },
      {
        name: "role",
        label: "Role",
        type: "select",
        options: [
          { value: "PLANT_MANAGER", label: "Plant Manager" },
          { value: "PLANT_SUPERVISOR", label: "Supervisor" },
          { value: "PLANT_OPERATOR", label: "Operator" },
        ],
        defaultValue: user.role,
      },
    ],
  });

  useImperativeHandle(ref, () => ({
    resetForm,
  }));

  const onSubmit = (values: any) => {
    console.log({ values });
  };

  const handleSubmit = form.handleSubmit((values) => onSubmit(values));

  return (
    <SheetContent className="gap-0 px-2" onOpenAutoFocus={(e) => e.preventDefault()}>
      <SheetHeader>
        <SheetTitle>User Details</SheetTitle>
        <SheetDescription>
          Make changes to the user here. Click save when youre done.
        </SheetDescription>
      </SheetHeader>
      <div className="px-4">
        <Separator />
      </div>
      <FlexContainer className="gap-4 p-4">
        <Image
          src={user.image}
          alt={user.name}
          width={100}
          height={100}
          className="rounded-full object-cover mb-4"
        />

        <Form {...form} >
          <form id="user-form" onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            {(Object.keys(uiFields) as (keyof typeof uiFields)[]).map((key) => {
              return (
                <FormField
                  key={uiFields[key].key}
                  name={uiFields[key].name}
                  control={form.control}
                  render={() => (
                    <FormItem>
                      {uiFields[key].label && (
                        <FormLabel htmlFor={uiFields[key].name}>{uiFields[key].label}</FormLabel>
                      )}
                      <FormControl>{renderField(uiFields[key], "w-full")}</FormControl>
                      {form.formState.errors[uiFields[key].name] && (
                        <FormMessage>
                          {form.formState.errors[uiFields[key].name]?.message?.toString()}
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
        <Button type="submit" form="user-form">
          Save changes
        </Button>
      </SheetFooter>
    </SheetContent>
  );
});

UserDetailSheet.displayName = "UserDetailSheet";

export default UserDetailSheet;
