import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - Special Graphics",
  description: "Admin dashboard for managing Special Graphics platform",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

