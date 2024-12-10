"use client";

import Navbar from "@/components/navbar/navbar";
import { usePathname } from "next/navigation";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const isExcludedPage = pathname === "/login" || pathname === "/signup";

  return !isExcludedPage ? <Navbar /> : null;
}
