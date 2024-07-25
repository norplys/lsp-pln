"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { getSession, signIn } from "next-auth/react";
import { login } from "@/actions/auth";
import Link from "next/link";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(1, {
    message: "Password must be at least 1 characters.",
  }),
});

export default function LoginForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {email, password} = values

    try {
      const data = await login(email, password);

      if (data.status !== 200){
        throw new Error(data.message);
      }

      toast({
        title: "Success",
        description: "User logged in successfully.",
        className: "bg-green-500",
        duration: 5000,
      });

      await getSession();
      window.location.href = '/'

    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          className: "bg-red-600 text-white",
          duration: 5000,
        });
      }
    } 
  }

  const handleOauth = async () => {
    
    try {
      await signIn("google", {
        callbackUrl: "/",
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-white grid gap-5 bg-white/30 p-10 rounded-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <h1 className="text-2xl font-bold">Login</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="youremail@gmail.com"
                    className="text-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" className="text-black" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="font-bold text-white"
          >
            Login
          </Button>
        </form>
        <Button
          onClick={handleOauth}
          className="text-black font-bold"
        >
          <FcGoogle className="text-xl" />
        </Button>
        <Link href="/register">
          <p className="text-white">Don't have an account? Register</p>
        </Link>
      </Form>
    </div>
  );
}
