"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ApplicationFilter = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center w-full md:p-8 md:w-56 space-x-4">
      <span className="flex space-x-2">
        <input
          defaultChecked={true}
          onChange={(e) => {
            router.push("/dashboard/application/" + e.target.value);
          }}
          type="radio"
          value="all"
          name="type"
          id=""
          className="scale-150 cursor-pointer"
        />
        <label htmlFor="">All</label>
      </span>
      <span className="flex space-x-2">
        <input
          onChange={(e) => {
            router.push("/dashboard/application/" + e.target.value);
          }}
          type="radio"
          value="pending"
          name="type"
          id=""
          className="scale-150 cursor-pointer"
        />
        <label htmlFor="">Pending</label>
      </span>
      <span className="flex space-x-2">
        {" "}
        <input
          onChange={(e) => {
            router.push("/dashboard/application/" + e.target.value);
          }}
          type="radio"
          value="interview"
          name="type"
          id=""
          className="scale-150 cursor-pointer"
        />
        <label htmlFor="">Interview</label>
      </span>
      <span className="flex space-x-2">
        <input
          onChange={(e) => {
            router.push("/dashboard/application/" + e.target.value);
          }}
          type="radio"
          value="declined"
          name="type"
          id=""
          className="scale-150 cursor-pointer"
        />
        <label htmlFor="">Decliened</label>
      </span>
    </div>
  );
};

export default ApplicationFilter;
