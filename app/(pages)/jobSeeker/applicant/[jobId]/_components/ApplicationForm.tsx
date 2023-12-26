"use client";
import React, { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import applicationValidator from "@/app/validationSchema/applicationSchemaValidator";
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
import { Loader2 } from "lucide-react";
import axios from "axios";

import toast from "react-hot-toast";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ApplicationForm = ({ jobId }: { jobId: string }) => {
  const form = useForm<z.infer<typeof applicationValidator>>({
    resolver: zodResolver(applicationValidator),
    defaultValues: {
      coverLetter: "",
    },
  });

  async function onSubmit(values: z.infer<typeof applicationValidator>) {
    try {
      const formData: any = values;
      formData.jobId = jobId;

      await axios.post(
        "http://localhost:3000/api/jobSeeker/application",
        formData
      );
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
          <CardTitle>Application Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">
                      Describe your personality
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="dark:text-gray-200"
                        placeholder="I ...."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

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

export default ApplicationForm;

export const ButtonLoading = ({
  loading,
  isUpdate,
}: {
  loading: boolean;
  isUpdate: boolean;
}) => {
  if (loading) {
    return (
      <Button className="bg-main-900 dark:bg-main-100 hover:bg-main-950 dark:hover:bg-main-50 mt-4 flex justify-end transition-all duration-300 space-x-2 gap-x-1">
        {isUpdate ? "Updating" : "Registering"}
        <Loader2 className="animate-spin h-5 w-5 mx-2" />
      </Button>
    );
  }

  return (
    <Button className="mt-4 flex justify-end" type="submit">
      {isUpdate ? "Update" : "Register"}
    </Button>
  );
};
