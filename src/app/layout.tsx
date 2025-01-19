"use client";

import { Fuzzy_Bubbles } from 'next/font/google';
import "./globals.css";
import HomeForm from "../../components/home-form";
import { usePathname } from 'next/navigation';  // Import to get current path

const fb = Fuzzy_Bubbles({
  subsets: ["latin"],
  weight: '400'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();  // Get the current path

  // Only render HomeForm if we're on the homepage, not on /results
  return (
    <html lang="en">
      <body className={`${fb.className} bg-gray-100 text-gray-950`}>
        {pathname === '/' && <HomeForm />}  {/* Render HomeForm only on the homepage */}
        {children}
      </body>
    </html>
  );
}


// import { Fuzzy_Bubbles } from 'next/font/google';
// import "./globals.css";
// import HomeForm from "../../components/home-form";

// const fb = Fuzzy_Bubbles({
//   subsets: ["latin"],
//   weight: '400'
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${fb.className} bg-[#E3B491] text-gray-950 pt-16`}>
//         <HomeForm/>
//         {children}
//       </body>
//     </html>
//   );
// }
