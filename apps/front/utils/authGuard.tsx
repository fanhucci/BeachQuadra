'use client'
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }:{
  children: React.ReactNode
}) {
  const { isAuthenticated, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) return null; 

  return <>{children}</>;
}