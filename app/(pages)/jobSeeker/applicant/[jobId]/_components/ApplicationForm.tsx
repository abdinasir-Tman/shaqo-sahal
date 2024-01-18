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
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { API } from "@/lib/config";

const ApplicationForm = ({ jobId }: { jobId: string }) => {
  const router = useRouter();
  const [file, setFile] = useState<{ url: string; public_id: string }>();
  const form = useForm<z.infer<typeof applicationValidator>>({
    resolver: zodResolver(applicationValidator),
    defaultValues: {
      coverLetter: "",
      linkedIn: "",
      portfolio: "",
    },
  });

  async function onSubmit(values: z.infer<typeof applicationValidator>) {
    try {
      const formData: any = values;
      formData.jobId = jobId;
      formData.resume = file?.url;
      await axios.post(`${API}/api/jobSeeker/application`, formData);
      router.refresh();
      form.reset();
      toast.success("success Registered");
    } catch (error: any) {
      toast.error(error.response.data);
    }
  }
  const handleUploadSuccess = (response: any) => {};
  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Application Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
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
              <FormField
                control={form.control}
                name="linkedIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">
                      LinkedIn
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="dark:text-gray-200"
                        placeholder="../"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="portfolio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">
                      Portfolio url
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="dark:text-gray-200"
                        placeholder="...."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <CldUploadWidget
                  uploadPreset="ml_default"
                  onSuccess={handleUploadSuccess}
                  onUpload={(result, widget) =>
                    // @ts-ignore
                    setFile(result.info)
                  }
                >
                  {({ open }) => {
                    function handleOnClick() {
                      setFile(undefined);
                      open();
                    }
                    return (
                      <Button
                        className="bg-main-900 dark:bg-main-100 mt-4 hover:bg-main-950 dark:hover:bg-main-50 transition-all  duration-300"
                        onClick={(e) => {
                          e.preventDefault();
                          handleOnClick();
                        }}
                      >
                        Resume
                      </Button>
                    );
                  }}
                </CldUploadWidget>
                <ButtonLoading
                  isUpdate={false}
                  loading={form.formState.isSubmitting}
                />
              </div>
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
      <Button className="text-center  bg-main-900 dark:bg-main-100 hover:bg-main-950 dark:hover:bg-main-50 mt-4 flex justify-end transition-all duration-300 space-x-2 gap-x-1">
        {isUpdate ? "Updating" : "Registering"}
        <Loader2 className="animate-spin h-5 w-5 mx-2" />
      </Button>
    );
  }

  return (
    <Button className="text-center  mt-4 flex justify-end" type="submit">
      {isUpdate ? "Update" : "Register"}
    </Button>
  );
};
