"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CircleUser } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { AiFillThunderbolt } from 'react-icons/ai'
import MobileNavbar from './mobile-navbar'
import { useSession } from 'next-auth/react'


export default function UserNavbar() {
    const session = useSession()
    const user = session?.data?.user

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10 bg-black">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <div
            className="flex items-center gap-2 font-semibold"
          >
          <AiFillThunderbolt className="h-6 w-6 text-accent" />  
          </div>
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          {user ? <><Link
            href="/billing"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Billing
          </Link>
          <Link
            href="/payment"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Payment
          </Link></> : ''}
        </nav>
        <MobileNavbar />
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='ml-auto'>
              <Button variant="secondary" size="icon" className="rounded-full border-2 border-white overflow-hidden cursor-pointer">
                {
                    user?.image ? <Image src={user.image} width={100} height={100} alt="ProfileImage"></Image> : <CircleUser className="h-5 w-5" />
                }
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className='bg-black text-white'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => signOut({
                callbackUrl: '/login'
              })}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    )
}
