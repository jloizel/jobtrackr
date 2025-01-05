"use client";

import Footer from "@/components/footer/footer";
import MobileNavbar from "@/components/navbar/mobileNavbar";
import Navbar from "@/components/navbar/navbar";
import { createTheme, useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";

export function ConditionalNavbar() {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 1024,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const pathname = usePathname();
  const isExcludedPage = pathname === "/login" || pathname === "/signup";

  if (isExcludedPage) return null;

  return isMobile ? <MobileNavbar /> : <Navbar />;
}

export function ConditionalFooter() {
  const pathname = usePathname();
  const isExcludedPage = pathname === "/login" || pathname === "/signup";

  return !isExcludedPage ? <Footer /> : null;
}
