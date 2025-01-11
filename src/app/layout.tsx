import { CustomThemeProvider } from "@/providers";
import type { Metadata } from "next";

import "@/styles/globals.css";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Send Space | Quick File Sharing",
  description: "Send Space | Quick File Sharing",
  keywords:
    "sendspace, send space, send, share, ssavr, online clipbord, share, send, send get, sendwebsite, sendsite, se, ss, spacesend, space, spaceshare, sharing, online sharing, shareonline, sendonline, sendfile, sendfiles, sendfiles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="">
        <CustomThemeProvider>
          <Header /> {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}
