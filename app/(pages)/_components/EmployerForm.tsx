"use client";
import React, { useEffect, useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import validateEmployer from "@/app/validationSchema/employerSchemaValidator";
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
import { useSession } from "next-auth/react";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";

const EmployerForm = () => {
  const { data: session }: any = useSession();
  const [file, setFile] = useState<string>();

  const form = useForm<z.infer<typeof validateEmployer>>({
    resolver: zodResolver(validateEmployer),
    defaultValues: {
      companyName: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof validateEmployer>) {
    try {
      const formData: any = values;
      formData["email"] = session?.user.email;
      formData["newImage"] = file;

      await axios.post("http://localhost:3000/api/employer", formData);
      form.reset();
      setFile("");
      toast.success("success Registered");
    } catch (error) {
      console.log(error);
      toast.error("unknown error");
    }
  }
  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Employer Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">
                      Company Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="dark:text-gray-200"
                        placeholder="Company Name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">addres</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:text-gray-200"
                        placeholder="address"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
                    <FormControl>
                      
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps} disabled />
                        <div className="mt-1 flex justify-center rounded-lg border border-dashed dark:border-gray-200 border-gray-900/25 px-5 py-5">
                          <div className="cursor-pointer text-center">
                            <CameraIcon className="h-10 w-10 dark:text-gray-200 text-gray-900/25" />
                          </div>
                        </div>
                        {file && (
                          <img
                            src={file.preview}
                            alt="Preview"
                            style={{ maxWidth: "200px", maxHeight: "200px" }}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <div className="space-y-3">
                <CldUploadWidget
                  uploadPreset="ml_default"
                  onUpload={(result, widget) =>
                    // @ts-ignore
                    setFile(result.info.url)
                  }
                >
                  {({ open }) => {
                    function handleOnClick() {
                      setFile(undefined);
                      open();
                    }
                    return (
                      <Button
                        className="bg-main-900 dark:bg-main-100 hover:bg-main-950 dark:hover:bg-main-50 transition-all  duration-300"
                        onClick={(e) => {
                          e.preventDefault();
                          handleOnClick();
                        }}
                      >
                        Upload an Image
                      </Button>
                    );
                  }}
                </CldUploadWidget>
                {file && (
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-2">
                      Image Preview:
                    </label>
                    <img
                      src={file}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              {file && (
                <ButtonLoading
                  loading={form.formState.isSubmitting}
                  isUpdate={false}
                />
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployerForm;

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
        <Loader2 className="animate-spin h-5 w-5  mx-2" />
      </Button>
    );
  }

  return <Button type="submit">{isUpdate ? "Update" : "Register"}</Button>;
};
