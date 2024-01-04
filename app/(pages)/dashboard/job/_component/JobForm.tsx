"use client";
import React, { useEffect, useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import jobListValidator from "@/app/validationSchema/jobListSchemaValidator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "lucide-react";
import axios from "axios";

import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { JobListing } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
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
const workTypes = [
  {
    id: "freelancer",
    label: "Freelancer",
  },
  {
    id: "fullTime",
    label: "Full Time",
  },

  {
    id: "partTime",
    label: "Part Time",
  },
] as const;
const JobForm = ({ joblist }: { joblist: JobListing }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof jobListValidator>>({
    resolver: zodResolver(jobListValidator),
    defaultValues: {
      title: joblist?.title,
      description: joblist?.description,
      salary: joblist?.salary,
      jobCategory: joblist?.jobCategory,
      workType: joblist?.workType,
      location: joblist?.location,
    },
  });

  async function onSubmit(values: z.infer<typeof jobListValidator>) {
    try {
      const formData: any = values;
      console.log(formData);
      if (joblist) {
        await axios.patch(
          `http://localhost:3000/api/employer/job/${joblist?.id}`,
          formData
        );
        toast.success("success Updated");
      } else {
        await axios.post("http://localhost:3000/api/employer/job", formData);
        toast.success("success Registered");
      }

      form.reset();

      router.push("./");
    } catch (error) {
      toast.error("unknown error");
    }
  }
  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Job Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">Title</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:text-gray-200"
                        placeholder="Title"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">Salary</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="dark:text-gray-200"
                        placeholder="Salary"
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

              <FormField
                control={form.control}
                name="jobCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">
                      Job Category
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Job Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          {items.map((item) => (
                            <SelectItem value={item.id}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="dark:text-gray-200"
                        placeholder="Location"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">
                      Work Type
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="work Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {workTypes.map((item) => (
                            <SelectItem value={item.id}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="dark:text-gray-200"
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <ButtonLoading
                isUpdate={!!joblist}
                loading={form.formState.isSubmitting}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobForm;

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
        <Loader className="animate-spin h-5 w-5  mx-2" />
      </Button>
    );
  }

  return <Button type="submit">{isUpdate ? "Update" : "Register"}</Button>;
};
