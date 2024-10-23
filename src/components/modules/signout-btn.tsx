"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";

export default function SignoutButton() {
  const router = useRouter();
  const { updateUser } = useUserStore();

  async function handleSignout() {
    await fetch("/api/signout", {
      method: "POST",
    });

    // Clear user state
    updateUser({ email: "" });

    // Redirect to login page
    router.push("/");
  }

  return (
    <button
      onClick={handleSignout}
      className="h-[30px] rounded bg-gray-500 p-1 text-xs font-bold text-white"
    >
      Sign Out
    </button>
  );
}
