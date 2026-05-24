'use client'

import SemAutorizacao from "@/components/erros/semAutorizacao";
import { useUser } from "@/context/userContext";
import { useParams } from "next/navigation";

export default function EmployeeLayout({children}:{children:React.ReactNode}){
    const {user} = useUser();
    const {id} = useParams();
    console.log(user?.id_pessoa)
    console.log(user?.id_cargo)
    console.log(Number(id));
    console.log(!user || (user.id_cargo === 1 && user.id_pessoa !== Number(id)))
    if (!user || (user.id_cargo === 1 && user.id_pessoa !== Number(id))) {
        return <SemAutorizacao />;
    }

    return(
        <>
            {children}
        </>
    )
}