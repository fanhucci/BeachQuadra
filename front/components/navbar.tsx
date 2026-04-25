'use client'
import { useUser } from "@/context/userContext";
import Link from "next/link";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useUser();

  return (
    <nav className="w-full h-14 px-8 flex items-center justify-between bg-[#1F4E6B] text-white shadow-md">
      <Link href="/" className="text-xl font-bold tracking-wide">
        BeachQuadra
      </Link>

      <div className="flex items-center gap-8 text-sm">
        {!isAuthenticated && <Link href="/login">Login</Link>}

        {isAuthenticated && (
          <>
            <Link href="/usuarios/perfil">Perfil</Link>

            {user?.cargo === 1 && (
              <>
                <Link href="/usuarios">Usuários</Link>
                <Link href="/quadras">Quadras</Link>
                <Link href="/horario">Horário</Link>
              </>
            )}

            <button onClick={logout}>Sair</button>
          </>
        )}
      </div>
    </nav>
  );
}