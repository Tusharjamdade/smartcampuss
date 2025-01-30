// "use client"
// import * as React from "react";
// import { Inter } from 'next/font/google';
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { GalleryVerticalEnd, Search } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
//   SidebarProvider,
//   SidebarTrigger
// } from "@/components/ui/sidebar";

// const inter = Inter({ subsets: ["latin"] });

// const navItems = [
//   { name: "Introduction", href: "/" },
//   { name: "Getting Started", href: "/getting-started" },
//   { name: "Components", href: "/components" },
//   { name: "API Reference", href: "/api-reference" },
// ];

// export default function DocsLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();

//   return (
//     <SidebarProvider className="mt-20">
//       <Sidebar>
//         <SidebarHeader>
//           <SidebarMenu>
//             <SidebarMenuItem>
//               <SidebarMenuButton size="lg" asChild>
//                 <Link href="/">
//                   <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
//                     <GalleryVerticalEnd className="size-4" />
//                   </div>
//                   <div className="flex flex-col gap-0.5 leading-none">
//                     <span className="font-semibold">Docs</span>
//                     <span className="">v1.0.0</span>
//                   </div>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           </SidebarMenu>
//           <form>
//             <SidebarGroup className="py-0">
//               <SidebarGroupContent className="relative">
//                 <Label htmlFor="search" className="sr-only">
//                   Search
//                 </Label>
//                 <Input id="search" placeholder="Search the docs..." className="pl-8" />
//                 <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
//               </SidebarGroupContent>
//             </SidebarGroup>
//           </form>
//         </SidebarHeader>
//         <SidebarContent>
//           <SidebarGroup>
//             <SidebarGroupLabel>Navigation</SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {navItems.map((item) => (
//                   <SidebarMenuItem key={item.href}>
//                     <SidebarMenuButton asChild isActive={pathname === item.href}>
//                       <Link href={item.href}>{item.name}</Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </SidebarContent>
//       </Sidebar>
//       <SidebarTrigger className="ml-3 mt-3" />
//       <main className="flex-1 overflow-auto p-8 pt-16">{children}</main>
//     </SidebarProvider>
//   );
// }


import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page