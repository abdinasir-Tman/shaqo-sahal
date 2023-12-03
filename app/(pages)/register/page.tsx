"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import EmployerForm from "../_components/EmployerForm";

const Register = () => {
  const [currentForm, setCurrentForm] = useState<string>("JobSeeker");
  return (
    <div className="bg-main-50 dark:bg-main-950 max-w-5xl w-full h-screen flex justify-center items-center">
      <div className="space-y-4">
        <div className="space-x-4">
          <Button
            size={"sm"}
            onClick={() => {
              setCurrentForm("JobSeeker");
            }}
            className={cn(
              "bg-main-900 dark:bg-main-100 hover:bg-main-950 dark:hover:bg-main-50 transition-all duration-300",
              currentForm === "JobSeeker" && "ring-2 focus:ring-main-500"
            )}
          >
            Job Seeker
          </Button>
          <Button
            size={"sm"}
            onClick={() => {
              setCurrentForm("Employer");
            }}
            className={cn(
              "bg-main-900 dark:bg-main-100 hover:bg-main-950 dark:hover:bg-main-50 transition-all duration-300",
              currentForm === "Employer" && "focus:ring-2 focus:ring-main-500"
            )}
          >
            Employer
          </Button>
        </div>
        <div className="max-w-2xl w-56">
          {currentForm === "Employer" ? <EmployerForm /> : "somethin else"}
        </div>
      </div>
    </div>
  );
};

export default Register;
