"use client"
import AdminNavbar from "@/components/admin/admin-navbar";
import { useSession } from "next-auth/react";
import Protector from "@/components/protector";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminNavbarLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session = useSession();
    const { push } = useRouter();
    useEffect(() => {
      if (
        // session?.data?.user?.role === "ADMIN" || 
        session.status === "unauthenticated") {
        push("/login");
      }
    }, [session]);


    if (session.status === "loading" || session.status === "unauthenticated") {
      return <Protector />;
    }

    return (
      <section className="text-white flex min-h-screen w-full flex-col">
        <AdminNavbar />
          {children}
      </section>
    );
  }