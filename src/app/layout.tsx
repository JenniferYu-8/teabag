import { Inter } from 'next/font/google';
import "./globals.css";
import HomeForm from "../../components/home-form";

const inter = Inter({subsets : ['latin']})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HomeForm/>
        {children}
      </body>
    </html>
  );
}
