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
import { useDropzone } from "react-dropzone";
import { CameraIcon } from "lucide-react";
import axios from "axios";

interface FileWithPreview extends File {
  preview: string;
}
const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result as string);

    reader.onerror = (error) => reject(error);
  });
const EmployerForm = () => {
  const [file, setFile] = useState<FileWithPreview>();
  const { getRootProps, getInputProps } = useDropzone({
    accept: "images/*" as any,
    onDrop: (acceptedFiles) => {
      // Assuming you only want to handle the first file
      const file = acceptedFiles[0];

      if (file) {
        const fileWithPreview: FileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });

        setFile(fileWithPreview);
      }
    },
  });

  useEffect(() => {
    // Cleanup previews
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  const form = useForm<z.infer<typeof validateEmployer>>({
    resolver: zodResolver(validateEmployer),
    defaultValues: {
      companyName: "",
    },
  });
  async function onSubmit(values: z.infer<typeof validateEmployer>) {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key !== "gallery") {
          const value = values[key as keyof typeof values];

          if (value !== undefined) {
            formData.append(key, value.toString());
          }
        }
      });
      const base64 = await toBase64(file!);

      formData.append("newImage", base64);
      await axios.post("http://localhost:3000/api/employer", formData);
      console.log("success");
    } catch (error) {
      console.log(error);
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">email</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:text-gray-200"
                        placeholder="email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
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
              />

              <Button
                type="submit"
                className="bg-main-900 dark:bg-main-100 hover:bg-main-950 dark:hover:bg-main-50 transition-all duration-300"
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployerForm;
