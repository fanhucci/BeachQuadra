'use client'
import { apiRequest } from "@/utils/apiHandler";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id_pessoa: number;
  nome: string;
  id_cargo: number;
};

type UserContextType = {
  user: User | null;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  loading:boolean;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading,setLoading] = useState<boolean>(true);
    const router = useRouter();

    async function refreshUser() {
        try {
            const resposta = await apiRequest("/usuarios/perfil");

            setUser(resposta.usuario);
            setLoading(false);
        } catch {
            setUser(null);
            setLoading(false);
        }
    }

    async function logout() {

        await apiRequest("/logout",{method:"POST"});

        setUser(null);

        router.push('/');
    }

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                refreshUser,
                logout,
                loading
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);