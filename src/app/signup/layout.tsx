import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
