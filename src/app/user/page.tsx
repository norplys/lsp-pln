import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  return (
    <div>
      <h1>{JSON.stringify(session?.user)}</h1>
    </div>
  );
}
