'use client'
import SemAutorizacao from "@/components/erros/semAutorizacao";

export default function SemPermissaoPage(){
    return(
        <section className="flex flex-1 w-full items-center justify-center bg-white">
            <SemAutorizacao/>
        </section>
    )
}