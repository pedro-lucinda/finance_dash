import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/modules/login-form";

export default async function LoginPage() {
  const cookieStore = cookies();
  const savedEmail = cookieStore.get("email")?.value;

  // If the user is already logged in, redirect them to the dashboard
  if (savedEmail) {
    redirect("/dashboard");
  }

  // Render the login form if not logged in
  return (
    <div className="my-auto flex w-full items-center justify-center">
      <AuthForm
        title="Login"
        description="Enter your email below to login to your account"
        type="login"
      />
    </div>
  );
}
