"use client"
import UserNavbar from "@/components/homepage/user-navbar";
import { useSession } from "next-auth/react";
import Protector from "@/components/protector";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NavbarWrapper({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const {data, status} = useSession()
    const { push } = useRouter();
    useEffect(() => {
      if (
        status === "unauthenticated") {
        push("/login");
      }
    }, [status]);

    if (status === "loading" || status === "unauthenticated") {
      return <Protector />;
    }

    return (
      <section className="text-white flex min-h-screen w-full flex-col">
        <UserNavbar />
          {children}
      </section>
    );
  }