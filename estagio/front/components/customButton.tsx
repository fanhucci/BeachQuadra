type CustomButtomType = {
    funcao: ()=>void,
    texto:string,
    tipo: "primario" | "secundario" | "terciario" | "danger"
}



export default function CustomButtom({funcao, texto, tipo}:CustomButtomType){
    const estilo = {
        primario: "bg-[#FF70B8] text-white border-transparent hover:border-[#FF70B8] hover:bg-[#00B85C] ",
        secundario: "bg-[#EFF6FA] text-[#1F4E6B] border-[#1F4E6B] hover:bg-[#1F4E6B] hover:text-white ",
        terciario:"bg-[#EFF6FA] text-[#00B85C] border-[#00B85C] hover:bg-[#00B85C] hover:text-white ",
        danger: "bg-[#EFF6FA] text-[#ff8870] border-[#ff8870] hover:bg-[#ff8870] hover:text-white "
    };
    return(
        <button onClick={funcao} className={`${estilo[tipo]} flex items-center h-7 p-2 rounded border-2  transition hover:scale-105 hover:shadow-md `}>
            {texto}
        </button>
    )
}

