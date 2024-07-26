"use client";

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
    if (session.status === "authenticated") {
      push("/");
    }
  }, [session]);

  if (session.status === "loading" || session.status === "authenticated") {
    return <Protector />;
  }

  return (
      <>{children}</>
  );
}
