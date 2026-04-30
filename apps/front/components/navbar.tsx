'use client'
import { useUser } from "@/context/userContext";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full h-14 px-8 flex items-center justify-between bg-[#1F2937] text-gray-200 border-b border-gray-700">

      <div className="flex items-center gap-10">
        <Link href="/" className="text-lg font-semibold tracking-wide text-white">
          BeachQuadra
        </Link>

        {user && user.id_cargo > 1 && (
          <div className="flex items-center gap-6 text-sm">
            <Link href="/usuarios" className="hover:text-white transition">
              Usuários
            </Link>
            <Link href="/quadras" className="hover:text-white transition">
              Quadras
            </Link>
            <Link href="/horario" className="hover:text-white transition">
              Horário
            </Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 text-sm">
        {!isAuthenticated && (
          <Link
            href="/login"
            className="px-4 py-1.5 rounded bg-blue-500 hover:bg-blue-600 text-white transition"
          >
            Entrar
          </Link>
        )}

        {isAuthenticated && (
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-700 transition"
            >
              <span>{user?.nome}</span>
              <span className="text-xs opacity-60"><Menu /></span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded shadow-lg overflow-hidden">
                <Link
                  href="/perfil"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Perfil
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}