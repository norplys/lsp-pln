import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AiFillThunderbolt } from "react-icons/ai";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function MobileNavbar (){
    return (
        <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5 text-black" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className='bg-black text-white'>
          <nav className="grid gap-6 text-lg font-medium">
            <div

              className="flex items-center gap-2 text-lg font-semibold"
            >
              <AiFillThunderbolt className='w-6 h-6'/>
            </div>
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Orders
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Products
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Customers
            </Link>
            <Link href="#" className="hover:text-foreground">
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    )
}