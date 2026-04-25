'use client'
import { createContext, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

type User = {
    id: number;
    cargo: number;
};

type UserContextType = {
    user: User | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    function decodeToken(token: string): User {
        const decoded: any = jwt.decode(token);
        return { id: decoded.id, cargo: decoded.cargo };
    }

    function login(token: string) {
        localStorage.setItem("token", token);
        setToken(token);
        setUser(decodeToken(token));
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    useEffect(() => {
        const stored = localStorage.getItem("token");
        if (stored) {
        setToken(stored);
        setUser(decodeToken(stored));
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);