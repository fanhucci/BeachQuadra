import AuthGuard from "@/utils/authGuard";

export default function AuthLayout({children}:{children:React.ReactNode}){
    return(
        <AuthGuard>
            {children}
        </AuthGuard>
    )
}