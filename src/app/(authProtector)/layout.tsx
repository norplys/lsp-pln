import { auth } from "@/auth";
import Protector from "@/components/protector";
import { redirect, useRouter } from "next/navigation";

export default async function AdminNavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if(
    session 
  ){
    redirect('/')
  }

  if (session) {
    return <Protector />;
  }

  return (
      <>{children}</>
  );
}
