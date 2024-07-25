import { AdminPaymentTable } from "@/components/admin/payment/payment-table";
import { getAllUserPayments} from "@/actions/payment";

export default async function Page() {
    const payments = await getAllUserPayments();
    return (
        <div className="w-full h-screen flex justify-center p-10">
            <AdminPaymentTable payments= {payments}/>
        </div>
    );
}