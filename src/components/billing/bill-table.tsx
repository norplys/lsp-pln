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
import { Button } from "../ui/button";
import { createPayment } from "@/actions/payment";
import { PaymentModal } from "./create-payment-modal";

export type BillAndPayment = Bill & { payment: Payment[] }

export function BillTable({ bills }  : { bills: BillAndPayment[] }) {
  
  return (
    <Table className="border border-white">
      <TableHeader className="bg-slate-900">
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Total Usage</TableHead>
          <TableHead>Total Payment</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bills.map((bill, index) => (
          <TableRow key={bill.id} className="text-white">
            <TableCell>{index + 1}</TableCell>
            <TableCell>{bill.totalKwh} KWH</TableCell>
            <TableCell>Rp. {bill.totalPrice}</TableCell>
            <TableCell>{
              bill.payment[0].status === 'PAID' ? <div className="bg-green-500 w-fit rounded-lg p-2">SETTLED</div> : 
              bill.payment[0].status === 'PENDING' ? <div className="bg-yellow-500 w-fit rounded-lg p-2">PENDING</div> :
              <div className="bg-red-500 w-fit rounded-lg p-2">NOT PAID</div>
          
          }</TableCell>
            <TableCell>
              {!bill.payment[0].status? <PaymentModal bill = {bill} />
              : null}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
