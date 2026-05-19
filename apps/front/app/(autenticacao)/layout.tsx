export default function PublicLayout({children}:{children:React.ReactNode}){
    return(
        <>
          <main className="flex flex-1 flex-col w-full bg-white text-black">
            {children}
          </main>
        </>
    )
}