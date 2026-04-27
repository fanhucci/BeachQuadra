import Navbar from "@/components/navbar";
import "./globals.css";
import { Toaster } from "sonner";
import { UserProvider } from "@/context/userContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="h-full">
      <body className="h-full flex flex-col">
        <UserProvider>
          <Navbar />
          <main className="flex-1 bg-white text-black">
            {children}
            <Toaster richColors position="top-right" />
          </main> 
        </UserProvider>
      </body>
    </html>
  );
}