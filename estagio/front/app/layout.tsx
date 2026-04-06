import "./globals.css"
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="flex flex-col h-full w-full">

      <body className="flex flex-col h-full">

        <header className="flex justify-between p-2 bg-[#1F4E6B]">
          <Link href={'/'}>Home</Link>
          <Link href={"/login"}>Login</Link>
        </header>

        <main className="flex flex-col h-full w-full bg-white text-black">
          {children}
        </main>
      </body>

    </html>
  );
}
