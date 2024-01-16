import React from "react";
import { Control, Controller, SetFieldValue } from "react-hook-form";
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
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import timeArray from "./timeJson.json";
interface TimeControl {
  control: Control<any>;
  setValue: SetFieldValue<any>;
}
const Time = ({ control, setValue }: TimeControl) => {
  return (
    <Controller
      control={control}
      name="time"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Time</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "md:w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? timeArray.find((time) => time.name === field.value)?.name
                    : "Select time"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search Time..." />
                <CommandEmpty>No Time found</CommandEmpty>
                <CommandGroup>
                  {timeArray.map((time) => (
                    <CommandItem
                      value={time.name}
                      key={time.name}
                      onSelect={() => {
                        setValue("time", time.name);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          time.name === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {time.name}
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
};

export default Time;
