"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TransactionChart from "./bar-chart";
import { useUserStore } from "@/store/user";
import { ITransaction } from "@/store/user/types";

interface DashboardClientProps {
  email: string;
  transactions: ITransaction[];
}

export default function DashboardClient({
  email,
  transactions,
}: DashboardClientProps) {
  const { updateUser, setTransactions } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (transactions) {
      setTransactions(transactions);
    }
    if (email) {
      updateUser({ email });
      return;
    }

    // Redirect if email is not available (fallback)
    router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-5 py-1">
      <TransactionChart transactions={transactions} />
    </div>
  );
}
