"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Bill, Payment } from "@prisma/client";

export type paymentWithBill = Payment & {bill: Bill}


export function PaymentTable({payments} : {payments: paymentWithBill[]} ) {
  return (
    <Table className="rounded-xl overflow-hidden shadow-sm shadow-white">
      <TableHeader className="bg-slate-900">
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Account Number</TableHead>
          <TableHead>Account Name</TableHead>
          <TableHead>Total Payment</TableHead>
          <TableHead>Month</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Issued</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-slate-950">
        {payments.map((payment, index) => (
          <TableRow key={payment.id} className="text-white">
            <TableCell>{index + 1}</TableCell>
            <TableCell>{
              payment?.status === 'PAID' ? <div className="bg-green-500 w-fit rounded-lg p-2">SETTLED</div> : 
              payment?.status === 'PENDING' ? <div className="bg-yellow-500 w-fit rounded-lg p-2">PENDING</div> :
              payment?.status === 'CANCELLED' ? <div className="bg-red-500 w-fit rounded-lg p-2">REJECTED</div> :
              <div className="bg-red-500 w-fit rounded-lg p-2">UNPAID</div>
          }</TableCell>
          <TableCell>{payment.accountName}</TableCell>
          <TableCell>{payment.accountNumber}</TableCell>
          <TableCell>Rp. {payment.bill.totalPrice}</TableCell>
            <TableCell>{payment.bill.createdAt.toISOString().split("T")[0].toString().split("-")[1].toString()}</TableCell>
            <TableCell>{payment.bill.createdAt.toISOString().split("T")[0].toString().split("-")[0].toString()}</TableCell>
            <TableCell>{payment.createdAt.toISOString().split("T")[0].toString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
