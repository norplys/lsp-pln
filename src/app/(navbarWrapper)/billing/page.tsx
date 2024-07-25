import { BillTable  } from "@/components/billing/bill-table";
import { getAllUserBill } from "@/actions/bill";
import { auth } from "@/auth";

export default async function Page() {
    const session = await auth()
    const bills = await getAllUserBill(session?.user?.email || null);
    console.log(bills)
    return (
        <div className="w-full h-screen flex justify-center p-10">
            <BillTable bills={bills} />
        </div>
    );
}