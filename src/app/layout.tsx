import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Providers } from "@/components/Providers";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "예약 시스템",
  description: "부속실 및 차량 예약 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={nunito.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}