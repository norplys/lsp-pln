import { UserTable } from "@/components/admin/user-table"
import getAllUsers from "@/actions/admin"
import type { UserWithVariantAndUsage } from "@/components/admin/user-table"
import {getAllVariant} from "@/actions/variant";

export default async function Page({searchParams} : {
  searchParams?: { [key: string]: string | undefined };
}) {
  const { filter } = searchParams ?? { filter: null }
  const users = await getAllUsers(filter || null) as UserWithVariantAndUsage[]
  const variants = await getAllVariant();
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
            <UserTable users = { users } variants = {variants} /> 
      </main>
    </div>
  )
}
