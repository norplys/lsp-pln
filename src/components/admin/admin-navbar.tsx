"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { CircleUser } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { AiFillThunderbolt } from 'react-icons/ai'
import MobileNavbar from './mobile-navbar'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import revalidate from '@/actions/revalidate'


export default function AdminNavbar() {
    const [filter, setFilter] = useState<string>("")
    const { push } = useRouter() 
    const session = useSession()
    const user = session?.data?.user
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const createQueryString = (name: string, value: string) => {
      params.set(name, value);
      return params.toString();
    };

    useEffect(() => {
      const filter = searchParams.get("filter");
      if (filter) {
        setFilter(filter.toLocaleLowerCase());
      }
    }, [searchParams]);

    useEffect(() => {
      push(pathname + "?" + createQueryString("filter", filter));
    }, [filter]);

    async function handleClick(e: any) {
      e.preventDefault()
      const value = e?.target?.elements?.filter?.value
      setFilter(value)
      await revalidate(pathname + "?" + createQueryString("filter", filter));
    }

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10 bg-black">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <div
            className="flex items-center gap-2 font-semibold"
          >
          <AiFillThunderbolt className="h-6 w-6 text-accent" />  
          </div>
          <Link
            href="/dashboard"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/payment"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Payment
          </Link>
        </nav>
        <MobileNavbar />
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial" onSubmit={handleClick}>
            <div className="relative">
              <button className="absolute left-2.5 top-2.5 h-4 w-4 text-black flex justify-center items-center overflow-hidden" type='submit'><Search/></button>
              <Input
                type="text"
                name='filter'
                placeholder="Filter user..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] text-black"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
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
