import Navbar from "@/components/navbar";
import AuthGuard from "@/utils/authGuard";

export default function AuthLayout({children}:{children:React.ReactNode}){
    return(
        <AuthGuard>
            <Navbar />
            <main className="flex flex-1 flex-col w-full bg-white text-black h-full max-h-full min-h-0 overflow-hidden">
                {children}
            </main>
        </AuthGuard>
    )
}