import UserNavbar from "@/components/homepage/user-navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function NavbarWrapper({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session = await auth();
    if(session?.user?.role === 'ADMIN'){
      redirect('/dashboard')
    }

    return (
      <section className="text-white flex min-h-screen w-full flex-col">
        <UserNavbar />
          {children}
      </section>
    );
  }