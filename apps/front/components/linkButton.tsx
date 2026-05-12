import Link from "next/link";

interface LinkButtonProps extends React.LinkHTMLAttributes<LinkButtonProps> {

}

export default function LinkButton({
    children,
    ...props
}:LinkButtonProps){
    return(
        <Link
            ref={}
            {...props}
        >
            
            {children}
        </Link>
    )
}