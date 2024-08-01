import AdminNavbar from "@/components/admin/admin-navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminNavbarLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session = await auth();
      if (
        session?.user?.role !== "ADMIN" 
  ) {
        redirect('/login')
      }

    return (
      <section className="text-white flex min-h-screen w-full flex-col">
        <AdminNavbar />
          {children}
      </section>
    );
  }