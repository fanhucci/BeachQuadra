import Navbar from "@/components/navbar";

export default function PublicLayout({children}:{children:React.ReactNode}){
    return(
        <>
            <Navbar />
            <main className="flex flex-1 flex-col w-full bg-white text-black">
                {children}
            </main>
        </>
    )
}