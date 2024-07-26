"use client"
import UserNavbar from "@/components/homepage/user-navbar";

export default function NavbarWrapper({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
      <section className="text-white flex min-h-screen w-full flex-col">
        <UserNavbar />
          {children}
      </section>
    );
  }