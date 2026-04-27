type ModalTypes = {
    aberta:boolean,
    fechar:()=>void,
    children:React.ReactNode
}
export default function CustomModal({aberta, fechar, children}:ModalTypes){
    if(!aberta) return null;
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className=" bg-white rounded p-6 w-96 relative">
                <button onClick={fechar} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">&times;</button>
                {children}
            </div>
        </div>
    )
}