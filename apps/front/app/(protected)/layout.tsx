import SemAutorizacao from "@/components/erros/semAutorizacao";
import Navbar from "@/components/navbar";
import { useUser } from "@/context/userContext";
import AuthGuard from "@/utils/authGuard";
import { useRouter } from "next/navigation";

export default function AuthLayout({children}:{children:React.ReactNode}){
    const {user} = useUser();

    if(user?.id_cargo==1) return <SemAutorizacao/>
    
    return(
        <AuthGuard>
            <Navbar />
            <main className="flex flex-1 flex-col w-full bg-white text-black">
                {children}
            </main>
        </AuthGuard>
    )
}