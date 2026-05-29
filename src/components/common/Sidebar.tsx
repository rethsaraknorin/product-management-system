"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { DashboardIcon } from "@/components/icons/DashboardIcon";
import { ProductIcon } from "@/components/icons/ProductIcon";
import { OrderIcon } from "@/components/icons/OrderIcon";
import { CustomerIcon } from "@/components/icons/CustomerIcon";
import { ReportIcon } from "@/components/icons/ReportIcon";

const navItems = [
  { label: "Dashboard", icon: DashboardIcon, href: "/dashboard" },
  { label: "Product Management", icon: ProductIcon, href: "/products" },
  { label: "Order Management", icon: OrderIcon, href: "/orders" },
  { label: "Customer Management", icon: CustomerIcon, href: "/customers" },
  { label: "Reports", icon: ReportIcon, href: "/reports" },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-brand flex flex-col shrink-0">
      <div className="flex items-center gap-3 px-6 py-7">
        <Logo className="text-white shrink-0" />
        <span className="text-white font-semibold text-base">Logo</span>
      </div>

      <nav className="flex-1 px-2 space-y-2">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                "relative flex items-center gap-4 px-5 h-18 rounded-xl text-sm transition-colors",
                isActive
                  ? "text-white font-semibold"
                  : "text-white/50 hover:text-white/80 font-medium"
              )}
            >
              {isActive && (
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-18 bg-white rounded-r-[40px]" />
              )}
              <Icon className="shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
