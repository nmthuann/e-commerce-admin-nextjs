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
    {
      href: `/discount`,
      label: 'Discounts',
      active: pathname === `/discount`,
    },
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
    {
      href: `/product`,
      label: 'Products',
      active: pathname === `/product`,
    },
    {
      href: `/task`,
      label: 'Tasks',
      active: pathname === `/task`,
    },
    {
      href: `/employee`,
      label: 'Employees',
      active: pathname === `/employee`,
    },
    {
      href: `/customer`,
      label: 'Customers',
      active: pathname === `/customer`,
    },
    // {
    //   href: `/order`,
    //   label: 'Orders',
    //   active: pathname === `/order`,
    // },
    {
      href: `/setting`,
      label: 'Settings',
      active: pathname === `/setting`,
    },
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