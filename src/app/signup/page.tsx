import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/modules/login-form";

export default function Page() {
  const cookieStore = cookies();
  const savedEmail = cookieStore.get("email")?.value;

  // If the user is already logged in, redirect them to the dashboard
  if (savedEmail) {
    redirect("/dashboard");
  }
  return (
    <div className="my-auto flex w-full items-center justify-center ">
      <AuthForm
        title="Sign up"
        description="Enter your email below to sign up to your account"
        type="signup"
      />
    </div>
  );
}
