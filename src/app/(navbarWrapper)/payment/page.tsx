import { PaymentTable } from "@/components/payment/payment-table";
import { getAllUserPaymentsByEmail } from "@/actions/payment";
import { auth } from "@/auth";

export default async function Page() {
    const session = await auth()
    const payments = await getAllUserPaymentsByEmail(session?.user?.email || null);
    return (
        <div className="w-full h-screen flex justify-center p-10">
            <PaymentTable payments= {payments}/>
        </div>
    );
}