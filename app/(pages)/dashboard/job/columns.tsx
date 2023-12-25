"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { AlertDialogBox } from "./_component/AlertDialogoue";
export type JobList = {
  id: string;
  title: string;
  description: string;
  salary: number;
  createdAt: string;
};
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
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "jobCategory",
    header: "Job Category",
  },
  ,
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
      const router = useRouter();
      return (
        <div className="space-x-3">
          <Button onClick={() => router.push("./job/" + joblistInfo.id)}>
            Update
          </Button>
          <AlertDialogBox id={joblistInfo.id} />
        </div>
      );
    },
  },
];
