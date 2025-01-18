import { Indie_Flower } from 'next/font/google';
import "./globals.css";
import HomeForm from "../../components/home-form";

const indie_flower = Indie_Flower({
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
      <body className={`${indie_flower.className}`}>
        <HomeForm/>
        {children}
      </body>
    </html>
  );
}
