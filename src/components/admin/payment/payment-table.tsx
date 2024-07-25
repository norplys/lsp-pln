"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Bill, Payment, PaymentStatus, User } from "@prisma/client";
import { validateUserPayment } from "@/actions/payment";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export type paymentWithBillAndUser = Payment & { bill: Bill } & { user: User };

export function AdminPaymentTable({
  payments,
}: {
  payments: paymentWithBillAndUser[];
}) {
  const { toast } = useToast();
  const { refresh } = useRouter();
  async function handleValidatePayment(paymentId: string, status: PaymentStatus) {
    try {
      await validateUserPayment(paymentId, status);
      toast({
        title: "Success",
        description: "Payment has been validated",
        className: "bg-green-500",
      });
      refresh();
    } catch (error) {
      toast({
        title: "Failed",
        description: "Failed to validate payment",
        className: "bg-red-500",
      });
    }
  }

  return (
    <Table className="rounded-xl overflow-hidden shadow-sm shadow-white">
      <TableHeader className="bg-slate-900">
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Total Payment</TableHead>
          <TableHead>Month</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Issued</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-slate-950">
        {payments.map((payment, index) => (
          <TableRow key={payment.id} className="text-white">
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {payment?.status === "PAID" ? (
                <div className="bg-green-500 w-fit rounded-lg p-2">SETTLED</div>
              ) : payment?.status === "PENDING" ? (
                <div className="bg-yellow-500 w-fit rounded-lg p-2">
                  PENDING
                </div>
              ) : (
                <div className="bg-red-500 w-fit rounded-lg p-2">UNPAID</div>
              )}
            </TableCell>
            <TableCell>{payment.user.email}</TableCell>
            <TableCell>Rp. {payment.bill.totalPrice}</TableCell>
            <TableCell>
              {payment.bill.createdAt
                .toISOString()
                .split("T")[0]
                .toString()
                .split("-")[1]
                .toString()}
            </TableCell>
            <TableCell>
              {payment.bill.createdAt
                .toISOString()
                .split("T")[0]
                .toString()
                .split("-")[0]
                .toString()}
            </TableCell>
            <TableCell>
              {payment.createdAt.toISOString().split("T")[0].toString()}
            </TableCell>
            <TableCell className="flex gap-2">
              <Button className="bg-green-500" onClick={() => handleValidatePayment(payment.id, 'PAID')}>Validate</Button>
              <Button className="bg-red-500" onClick={() => handleValidatePayment(payment.id, 'CANCELLED')}>Deny</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
