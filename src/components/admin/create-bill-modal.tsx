"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { UserWithVariantAndUsage } from "./user-table";
import { RateVariant } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import createBill from "@/actions/bill";

export function CreateBill({
  user,
  variants,
}: {
  user: UserWithVariantAndUsage;
  variants: RateVariant[];
}) {
  const { refresh } = useRouter();
  const FormSchema = z.object({
    finalKwh: z.string().transform((v) => Number(v) || 0).refine((v) => v > user.usage[0].initialKwh, {
      message: `Final Kwh must be greater than ${user.usage[0].initialKwh}.`,
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try{
    const totalKwh = (data.finalKwh - user.usage[0].initialKwh) * user.variant.feeRate;
    await createBill(user.id, user.usage[0].id, data.finalKwh, totalKwh);
    toast({
      title: "Bill Created",
      description: "Bill Created Succesfully.",
      duration: 5000,
      className: "bg-green-500",
    });
    refresh();
    
  } catch (error) {
    if(error instanceof Error){
      toast({
        title: "Update Failed",
        description: error.message,
        duration: 5000,
        className: "bg-red-500",
      });
    }
  }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-black hover:text-slate-500">
          Create Bill
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-white bg-black">
        <DialogHeader>
          <DialogTitle>Create Bill</DialogTitle>
          <DialogDescription>
            Create bill for {user.email}<br />
            Month : {user.usage[0].createdAt.getMonth()}/{user.usage[0].createdAt.getFullYear()}<br />
            Initial KWH : {user.usage[0].initialKwh}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="finalKwh"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Final Kwh</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="text-black"
                      placeholder="1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
