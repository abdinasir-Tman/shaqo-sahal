"use client";
import React, { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import jobSeekerValidator from "@/app/validationSchema/jobSeekerSchemaValidator";
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
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// type Checked = DropdownMenuCheckboxItemProps["checked"];
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import axios from "axios";

import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const items = [
  {
    id: "computer science",
    label: "Computer Science",
  },
  {
    id: "it",
    label: "IT",
  },

  {
    id: "writer",
    label: "Writer",
  },
] as const;
const JobSeekerForm = () => {
  const form = useForm<z.infer<typeof jobSeekerValidator>>({
    resolver: zodResolver(jobSeekerValidator),
    defaultValues: {
      name: "",
      jobCategory: [],
    },
  });

  async function onSubmit(values: z.infer<typeof jobSeekerValidator>) {
    try {
      const formData: any = values;
      await axios.post("http://localhost:3000/api/jobSeeker", formData);
      form.reset();
      toast.success("success Registered");
    } catch (error: any) {
      toast.error(error.response.data);
    }
  }
  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>JobSeeker Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="dark:text-gray-200"
                        placeholder="Full Name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel className=" dark:text-gray-200">
                  Job Categories
                </FormLabel>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Job Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {items.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="jobCategory"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value: any) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <ButtonLoading
                isUpdate={false}
                loading={form.formState.isSubmitting}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobSeekerForm;

export const ButtonLoading = ({
  loading,
  isUpdate,
}: {
  loading: boolean;
  isUpdate: boolean;
}) => {
  if (loading) {
    return (
      <Button className="bg-main-900 dark:bg-main-100 hover:bg-main-950 dark:hover:bg-main-50 transition-all duration-300 space-x-2 gap-x-1">
        {isUpdate ? "Updating" : "Registering"}
        <Loader2 className="animate-spin h-5 w-5 mx-2" />
      </Button>
    );
  }

  return <Button type="submit">{isUpdate ? "Update" : "Register"}</Button>;
};
