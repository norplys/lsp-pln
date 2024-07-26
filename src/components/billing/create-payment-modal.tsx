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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BillAndPayment } from "./bill-table";
import { createPayment } from "@/actions/payment";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";


export function PaymentModal({ bill }: { bill: BillAndPayment }) {
  const { toast } = useToast();
  const { refresh } = useRouter();

  const FormSchema = z.object({
    accountName: z.string().min(3, {
      message: "Account Name must be at least 3 characters.",
    }),
    accountNumber: z.string().min(10, {
      message: "Account Number must be at least 10 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try{
    const userId = bill.userId;
    const billId = bill.id;
    await createPayment(userId, billId, data.accountName, data.accountNumber);
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
            <br />
            <br />
            Please fill your bank account details below
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="accountName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Accont Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="text-black"
                      placeholder="my account"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Account Number</FormLabel>
                  <FormControl>
                    <Input
                      type="telephone"
                      className="text-black"
                      placeholder="012345678910"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-green-600">Pay</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
