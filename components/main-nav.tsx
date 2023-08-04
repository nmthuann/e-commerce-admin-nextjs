"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/`,
      label: 'Overview',
      active: pathname === `/`,
    },
    {
      href: `/category`,
      label: 'Categories',
      active: pathname === `/category`,
    },
    // {
    //   href: `/${params}/discount`,
    //   label: 'Discounts',
    //   active: pathname === `/${params}/discount`,
    // },
    // {
    //   href: `/${params}/sizes`,
    //   label: 'Sizes',
    //   active: pathname === `/${params}/sizes`,
    // },
    // {
    //   href: `/${params}/colors`,
    //   label: 'Colors',
    //   active: pathname === `/${params}/colors`,
    // },
    // {
    //   href: `/${params}/product`,
    //   label: 'Products',
    //   active: pathname === `/${params}/product`,
    // },
    // {
    //   href: `/${params.storeId}/order`,
    //   label: 'Orders',
    //   active: pathname === `/${params}/order`,
    // },
    // {
    //   href: `/${params}/settings`,
    //   label: 'Settings',
    //   active: pathname === `/${params}/settings`,
    // },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};