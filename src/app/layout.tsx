import { Fuzzy_Bubbles } from 'next/font/google';
import "./globals.css";
import HomeForm from "../../components/home-form";

const fb = Fuzzy_Bubbles({
  subsets: ["latin"],
  weight: '400'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fb.className}`}>
        <HomeForm/>
        {children}
      </body>
    </html>
  );
}
