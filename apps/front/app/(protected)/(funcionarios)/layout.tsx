import SemAutorizacao from "@/components/erros/semAutorizacao";
import { useUser } from "@/context/userContext";

export default function EmployeeLayout({children}:{children:React.ReactNode}){
    const {user} = useUser()

    if(!user || user.id_cargo == 1) return <SemAutorizacao/>

    return(
        <main className="flex flex-1 flex-col w-full bg-white text-black">
            {children}
        </main>
    )
}