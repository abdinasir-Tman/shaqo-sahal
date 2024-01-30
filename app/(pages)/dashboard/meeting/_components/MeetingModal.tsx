"use client";

import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import meetingValidator from "@/app/validationSchema/meetingSchemaValidator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Loader2, VideoIcon, Videotape } from "lucide-react";
import axios from "axios";

import toast from "react-hot-toast";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, parseISO } from "date-fns";
import { API } from "@/lib/config";

import { Meeting } from "@prisma/client";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Time from "./Time";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
interface Data {
  meeting: Meeting;
  id: string;
  isExpired: boolean;
}
const meetType = [
  { id: 1, name: "Zoom" },
  { id: 2, name: "interview" },
];

const MeetingModal = ({ meeting, id, isExpired }: Data) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof meetingValidator>>({
    resolver: zodResolver(meetingValidator),
    defaultValues: {
      type: meeting?.type,
      date: meeting?.Date,
      time: meeting?.time,
      timeDuration: meeting?.timeDuration,
      note: meeting?.note,
    },
  });
  async function onSubmit(values: z.infer<typeof meetingValidator>) {
    try {
      const formData: any = values;

      if (meeting) {
        formData.appId = meeting.applicationId;
        await axios.patch(
          `${API}/api/employer/meeting/${meeting.id}`,
          formData
        );
        toast.success("success Updated");
        router.push("/dashboard/meeting");
      } else {
        formData.appId = id;
        await axios.post(`${API}/api/employer/meeting`, formData);
        toast.success("success Registered");
        router.push("/dashboard/meeting");
      }
      queryClient.invalidateQueries({ queryKey: ["meeting"] });
      form.reset();
    } catch (error: any) {
      toast.error(error.response.data);
    }
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          {meeting ? (
            <button disabled={isExpired} className="w-full cursor-pointer">
              edit
            </button>
          ) : (
            <Videotape />
          )}
        </DialogTrigger>
        <DialogContent className="md:h-full w-full overflow-auto">
          <DialogHeader>
            <DialogTitle>Meeting</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {" "}
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-gray-200">
                            Meet Type
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="meeting type" />
                              </SelectTrigger>
                              <SelectContent>
                                {meetType.map((meet) => (
                                  <SelectItem key={meet.id} value={meet.name}>
                                    {meet.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* date  */}
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "md:w-[220px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => {
                                  const nextMonthDate = new Date();
                                  nextMonthDate.setMonth(
                                    nextMonthDate.getMonth() + 1
                                  );
                                  return (
                                    date > nextMonthDate || date < new Date()
                                  );
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* time  */}
                    <Time control={form.control} setValue={form.setValue} />
                    {/* duration time  */}
                    <FormField
                      control={form.control}
                      name="timeDuration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-gray-200">
                            Time Duration
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="dark:text-gray-200"
                              placeholder="40"
                              {...field}
                              onChange={(e) => {
                                field.onChange(parseFloat(e.target.value) || 0);
                              }}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* note  */}
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-200">
                          Note
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="dark:text-gray-200 w-full"
                            placeholder="desc.."
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <ButtonLoading
                    isUpdate={!!meeting}
                    loading={form.formState.isSubmitting}
                  />
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeetingModal;
export const ButtonLoading = ({
  loading,
  isUpdate,
}: {
  loading: boolean;
  isUpdate: boolean;
}) => {
  if (loading) {
    return (
      <Button className="bg-main-900 mt-3 dark:bg-main-100 hover:bg-main-950 w-full dark:hover:bg-main-50 transition-all duration-300 space-x-2 gap-x-1">
        {isUpdate ? "Updating" : "Registering"}
        <Loader2 className="animate-spin h-5 w-5 mx-2" />
      </Button>
    );
  }

  return (
    <Button className="mt-3 w-full" type="submit">
      {isUpdate ? "Update" : "Register"}
    </Button>
  );
};
