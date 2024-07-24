"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RateVariant, User } from "@prisma/client";
import { CreateBillDialog } from "./create-bill-modal";
import { UpdateUserForm } from "./update-user-modal";

export type userWithVariant = User & { variant: RateVariant };

export function UserTable({ users, variants }: { users: userWithVariant[] | [], variants: RateVariant[] }) {
  return (
    <Table className="border border-white">
      <TableHeader className="bg-slate-900">
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead className="col-span-2">Email</TableHead>
          <TableHead>KwhNumber</TableHead>
          <TableHead>Variant</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user, i) => (
          <TableRow key={user?.kwhNumber} className="bg-slate-800">
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>{user?.email}</TableCell>
            <TableCell>{user?.kwhNumber}</TableCell>
            <TableCell>{user?.variant?.name} VA</TableCell>
            <TableCell className="flex gap-2">
              <CreateBillDialog />
              <UpdateUserForm user={user} variants = {variants} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
