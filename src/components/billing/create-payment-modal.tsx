import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BillAndPayment } from "./bill-table";
import { createPayment } from "@/actions/payment";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";


export function PaymentModal({ bill }: { bill: BillAndPayment }) {
  const { toast } = useToast();
  const { refresh } = useRouter();

  async function createPaymentHandler(userId: string, billId: string) {
    try{
    await createPayment(userId, billId);
    toast({
      title: "Payment Created",
      description: "Payment Created Succesfully.",
      duration: 5000,
      className: "bg-green-500",
    });
    refresh();
    }
    catch(e){
      if(e instanceof Error){
        toast({
          title: "Error",
          description: e.message,
          duration: 5000,
          className: "bg-red-500",
        });
      }
    }
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white text-black">Pay Here</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-white bg-black">
        <DialogHeader>
          <DialogTitle>Create Payment</DialogTitle>
          <DialogDescription>
            Please transfer the payment to the following account <br />
            Bank: BCA <br />
            Account Number: 1234567890 <br />
            Amount: Rp. {bill.totalPrice}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Bank Account
            </Label>
            <Input
              id="username"
              placeholder="012345678"
              className="col-span-3 text-black"
              type="telephone"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => createPaymentHandler(bill.userId, bill.id)}
          >
            Pay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
