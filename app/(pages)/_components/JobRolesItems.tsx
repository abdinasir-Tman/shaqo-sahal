"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, Controller, useFormContext } from "react-hook-form";
import { FormItem, FormLabel } from "@/components/ui/form";
import axios from "axios";
import { API } from "@/lib/config";
import { JobRoles } from "@prisma/client";
import { useCategory } from "@/hooks/CategoryContext";

interface CategoryIdSelect {
  control: Control<any>;
}

const JobRolesItems = ({ control }: CategoryIdSelect) => {
  const { reset, resetField } = useFormContext();
  const [jobRoles, setJobRoles] = useState<JobRoles[]>([]);
  const { getCategory, isLoading } = useCategory();

  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const { data } = await axios.get(`${API}/api/jobSeeker/jobRoles`);
        setJobRoles(data);
      } catch (err) {
        console.error("something went wrong", err);
      }
    };
    fetchJobRoles();
  }, []);

  return (
    <Controller
      control={control}
      name="role"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Choose Role</FormLabel>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            onOpenChange={() => {
              resetField("jobCategory");
              getCategory(field.value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent>
              {isLoading ? (
                <div className="w-full h-4 animate-pulse bg-gradient-to-b from-slate-300 to-slate-400"></div>
              ) : (
                jobRoles?.map((jobRole: any) => (
                  <SelectItem key={jobRole.id} value={jobRole.id}>
                    {jobRole.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default JobRolesItems;
