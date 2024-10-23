import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/modules/dashboard/dashboard-client";

export default async function DashboardPage() {
  const cookieStore = cookies();
  const email = cookieStore.get("email")?.value;

  if (!email) {
    // Optionally redirect to login if email is missing
    redirect("/");
  }

  // Get the base URL for the API request (server context needs an absolute URL)
  const baseUrl = headers().get("host"); // Retrieve the host (domain)

  const transactions = await fetch(`http://${baseUrl}/api/transactions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return [];
    });

  return (
    <div className="mx-auto flex w-full ">
      <DashboardClient email={email} transactions={transactions} />
    </div>
  );
}
