import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Header from "@/components/Header";
import { Container } from "react-bootstrap";

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
        <Header />
        <main>
          <Container className="mt-4">
            {children}
          </Container>
        </main>
      </body>
    </html>
  );
}