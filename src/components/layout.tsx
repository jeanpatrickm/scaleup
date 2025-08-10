"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/" },
    { name: "Tarefas", href: "/tasks" },
    { name: "Ideias", href: "/ideas" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r p-4 flex flex-col gap-2">
        <h2 className="text-xl font-bold mb-4">ScaleUp</h2>
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              className="w-full justify-start"
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </aside>

      {/* Área principal */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
