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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { UserWithVariantAndUsage } from "./user-table";
import { RateVariant } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { updateUser } from "@/actions/user";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }).optional(),
  name: z.string().min(1, {
    message: "Name must be at least 1 characters.",
  }).optional(),
  kwhNumber: z.string().min(1, {
    message: "Kwh Number must be at least 1 characters.",
  }).optional(),
  rateVariant: z.string().min(1, {
    message: "Rate Variant must be at least 1 characters.",
  }).optional(),
});

export function UpdateUserForm({
  user,
  variants,
}: {
  user: UserWithVariantAndUsage;
  variants: RateVariant[];
}) {
  const { refresh } = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try{
    await updateUser(data, user.id);
    toast({
      title: "Update Success",
      description: "User updated successfully.",
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
          Update User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-white bg-black">
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>
            Input credential to update this user
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="text-black"
                      defaultValue={user.email || ""}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input
                      type="name"
                      className="text-black"
                      defaultValue={user.name || ""}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kwhNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kwh Number</FormLabel>
                  <FormControl>
                    <Input
                      type="kwh-number"
                      defaultValue={user.kwhNumber || ""}
                      className="text-black"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rateVariant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate Variant</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={`${user.variant.name} VA`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-black text-white">
                      {variants.map((variant) => (
                        <SelectItem key={variant.id} value={variant.id}>
                          {variant.name} VA
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
