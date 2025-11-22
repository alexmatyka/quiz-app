"use client";

import type * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type SelectOption<T = string> = {
  value: T;
  label: string;
};

type AppSelectProps<T = string> = {
  options: SelectOption<T>[];
  value: T | undefined;
  onChangeAction: (option: SelectOption<T>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
} & React.ComponentProps<typeof SelectTrigger>;

export const AppSelect = <T extends string>({
  options,
  value,
  onChangeAction,
  placeholder = "Select...",
  className,
  disabled,
  ...triggerProps
}: AppSelectProps<T>) => {
  return (
    <Select
      value={value}
      onValueChange={(val) => {
        const selectedOption = options.find((o) => String(o.value) === val);
        if (selectedOption) onChangeAction(selectedOption);
      }}
      disabled={disabled}
    >
      <SelectTrigger
        className={cn("w-full", className)}
        aria-labelledby={triggerProps["aria-labelledby"]}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectScrollUpButton />
        {options.map((opt) => (
          <SelectItem key={String(opt.value)} value={String(opt.value)}>
            {opt.label}
          </SelectItem>
        ))}
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  );
};
