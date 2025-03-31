import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder?: string;
  maxLength?: number;
  type?: "input" | "select"; // New prop to determine field type
  options?: { value: string; label: string }[]; // Only for select fields
}

const CustomInput: React.FC<CustomInputProps> = ({
  control,
  name,
  label,
  placeholder,
  maxLength,
  type = "input",
  options = [],
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              {type === "input" ? (
                <Input
                  placeholder={placeholder}
                  className="border p-2 rounded-md"
                  type={name === "password" ? "password" : "text"}
                  maxLength={maxLength}
                  {...field}
                />
              ) : (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="border p-2 rounded-md bg-white">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </FormControl>
            <FormMessage className="text-red-500 mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
