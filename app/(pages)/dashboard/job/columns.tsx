"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { AlertDialogBox } from "./_component/AlertDialogoue";
import { UpdateBtn } from "./_component/UpdateBtn";
export type JobList = {
  id: string;
  title: string;
  description: string;
  salary: number;
  createdAt: string;
};
// @ts-ignore
export const columns: ColumnDef<JobList>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "requirements",
    header: "Requirements",
    cell: ({ row }) => {
      // @ts-ignore
      return <div className="truncate w-56">{row.original.requirements}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <div className="truncate w-56">{row.original.description}</div>;
    },
  },

  {
    accessorKey: "jobCategory",
    header: "Job Category",
  },
  ,
  {
    accessorKey: "salaryType",
    header: "Salary Type",
  },
  // {
  //   accessorKey: "deadline",
  //   header: "Deadline Date",
  // },
  {
    accessorKey: "salary",
    header: "Salary",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "workType",
    header: "Work Type",
  },
  {
    accessorKey: "created",
    header: () => <div className="text-right">Created</div>,
    cell: ({ row }) => {
      const formattedDate = new Date(row.getValue("created")).toDateString();

      return <div className="text-right font-medium">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const joblistInfo = row.original;

      return (
        <div className="space-x-3">
          <UpdateBtn joblistInfo={joblistInfo} />
          <AlertDialogBox id={joblistInfo.id} />
        </div>
      );
    },
  },
];
