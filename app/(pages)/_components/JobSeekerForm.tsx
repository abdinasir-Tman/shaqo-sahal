"use client";
import React, { useState } from "react";
import z from "zod";
import { useCategory } from "@/hooks/CategoryContext";
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

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import axios from "axios";

import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { API } from "@/lib/config";
import JobRolesItems from "./JobRolesItems";
import { JobSeeker } from "@prisma/client";
import { useRouter } from "next/navigation";

const JobSeekerForm = ({ jobSeeker }: { jobSeeker: JobSeeker }) => {
  const { roleCategories, isLoading } = useCategory();
  const router = useRouter();

  const form = useForm<z.infer<typeof jobSeekerValidator>>({
    resolver: zodResolver(jobSeekerValidator),
    defaultValues: {
      name: jobSeeker?.name,
      jobCategory: jobSeeker?.jobCategory,
      role: jobSeeker?.role,
    },
  });

  async function onSubmit(values: z.infer<typeof jobSeekerValidator>) {
    console.log("submkited");
    try {
      const formData: any = values;
      if (jobSeeker) {
        await axios.patch(`${API}/api/jobSeeker/${jobSeeker.id}`, formData);
      } else {
        await axios.post(`${API}/api/jobSeeker`, formData);
      }

      form.reset();
      router.push("/");
      toast.success("success Registered");
    } catch (error: any) {
      toast.error(error.response.data);
    }
  }

  return (
    <div className="w-full md:w-[42rem]">
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
              {/* job roles  */}
              <JobRolesItems control={form.control} />

              {/* job categories  */}
              <div className="flex flex-col gap-3">
                <FormLabel className=" dark:text-gray-200">
                  Job Categories
                </FormLabel>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Job Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoading ? (
                      <div className="w-10 h-4 animate-pulse bg-gradient-to-b from-slate-300 to-slate-400"></div>
                    ) : (
                      roleCategories?.map((item: any) => (
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
                                    checked={field.value?.includes(item.name)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        const newValue = Array.isArray(
                                          field.value
                                        )
                                          ? [...field.value, item.name]
                                          : [item.name];
                                        field.onChange(newValue);
                                      } else {
                                        const newValue = field.value?.filter(
                                          (value) => value !== item.name
                                        );

                                        field.onChange(newValue);
                                      }
                                      // return checked
                                      //   ? field.onChange([
                                      //       ...field.value,
                                      //       item.name,
                                      //     ])
                                      //   : field.onChange(
                                      //       field.value?.filter(
                                      //         (value: any) => value !== item.name
                                      //       )
                                      //     );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <ButtonLoading
                isUpdate={!!jobSeeker}
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
