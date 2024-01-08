"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { Control, SetFieldValue } from "react-hook-form";
import { useEffect } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCategory } from "@/hooks/CategoryContext";

interface CategoryControl {
  control: Control<any>;
  setValue: SetFieldValue<any>;
}

export function JobCategoryItem({ control, setValue }: CategoryControl) {
  const { allCategories, getAllCategories } = useCategory();
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <FormField
      control={control}
      name="jobCategory"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Job Category</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? allCategories.find(
                        (category) => category.name === field.value
                      )?.name
                    : "Select job Category"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search category..." />
                <CommandEmpty>No Job Category found.</CommandEmpty>
                <CommandGroup>
                  {allCategories.map((category) => (
                    <CommandItem
                      value={category.name}
                      key={category.name}
                      onSelect={() => {
                        setValue("jobCategory", category.name);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          category.name === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {category.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
