"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RateVariant, Usage, User } from "@prisma/client";
import { CreateBill } from "./create-bill-modal";
import { UpdateUserForm } from "./update-user-modal";
import { Button } from "../ui/button";
import { deleteUser } from "@/actions/user";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export type UserWithVariantAndUsage = User & { variant: RateVariant } & { usage: Usage[] };

export function UserTable({ users, variants }: { users: UserWithVariantAndUsage[] | [], variants: RateVariant[] }) {
  const { refresh } = useRouter();
  const { toast } = useToast();

  const handleDelete = async (email: string) => {
    try {
      if (!email) {
        throw new Error("Please provide email");
      }
      await deleteUser(email);
      toast({
        title: "Delete Success",
        description: "User deleted successfully.",
        duration: 5000,
        className: "bg-green-500",
      });
      refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Delete Failed",
          description: error.message,
          duration: 5000,
          className: "bg-red-500",
        });
      }
    }
  }

  return (
    <Table className="rounded-xl overflow-hidden shadow-sm shadow-white">
      <TableHeader className="bg-slate-900">
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead className="col-span-2">Email</TableHead>
          <TableHead>KwhNumber</TableHead>
          <TableHead>Variant</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-slate-950">
        {users?.map((user, i) => (
          <TableRow key={user?.kwhNumber} className="bg-slate-800">
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>{user?.email}</TableCell>
            <TableCell>{user?.kwhNumber}</TableCell>
            <TableCell>{user?.variant?.name} VA</TableCell>
            <TableCell className="flex gap-2">
              <CreateBill user={user} variants={variants} />
              <UpdateUserForm user={user} variants = {variants} />
              <Button variant="outline" className="bg-red-600 text-white" onClick={() => handleDelete(user.email) }>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
