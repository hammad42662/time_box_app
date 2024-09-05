import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ClientProvider from "./redux/provider";
import Script from "next/script";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Time Box App",
  description: "Daily Schedule Planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LBHT2K3VW0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-LBHT2K3VW0');`}
        </Script>
      </head>
      <body className={`${poppins.className} `}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
