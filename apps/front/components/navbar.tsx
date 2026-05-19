'use client';

import Link from "next/link";
import { useUser } from "@/context/userContext";
import SubmitButton from "./buttonComponents/submitButton";
import { LogOut, User, Calendar, Users, DollarSign, Layers, Clock, Menu, CalendarDays, ChevronLeft, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LinkButton from "./buttonComponents/linkButton";

export default function Navbar() {
  const { user } = useUser();

  const cargo = Number(user?.id_cargo);

  switch (cargo) {
    case 1: return <ClientNavbar />;
    case 2: return <EmployeeSidebar />;
    case 3: return <EmployeeSidebar />;
    default:
      return <ClientNavbar />;
  }
}
export function NavbarLinks({className}:{className?:string;}){
  return(
    <section className={`${className}`}>
      <Link href="/usuarios" className="hover:text-white transition">
        Usuários
      </Link>
            
      <Link href="/agenda" className="hover:text-white transition">
        Agenda
      </Link>

      <Link href="/cobrancas" className="hover:text-white transition">
        Cobranças
      </Link>

      <Link href="/quadras" className="hover:text-white transition">
        Quadras
      </Link>

      <Link href="/horario" className="hover:text-white transition">
        Horario
      </Link>
    </section>
  )
}

export function ClientNavbar() {
  const { isAuthenticated, user, logout } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white h-16 px-4 md:px-8 border-b border-gray-700 flex items-center justify-between">

      <Link href="/" className="text-2xl font-bold tracking-tight">
        BeachQuadra
      </Link>

  
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="relative flex items-center gap-3" ref={menuRef}>
            <span className="hidden sm:inline text-sm text-gray-300 font-medium">
              Olá, {user?.nome?.split(" ")[0]}
            </span>


            <SubmitButton
              estilo="fantasma"
              className="p-2! bg-gray-700! hover:bg-gray-800 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-6 w-6 text-gray-200" />
            </SubmitButton>

            {isOpen && (
              <div className="absolute right-0 top-12 w-48 bg-white text-gray-800 rounded-2xl shadow-xl py-2 border border-gray-100 flex flex-col z-50">
                <Link
                  href="/perfil"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50 transition"
                >
                  <User className="h-4 w-4 text-gray-500" />
                  Meu Perfil
                </Link>
                
                <Link
                  href="/agenda" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50 transition"
                >
                  <CalendarDays className="h-4 w-4 text-gray-500" />
                  Agendar Quadra
                </Link>

                <hr className="my-1 border-gray-100" />

                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition text-left w-full font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <LinkButton href="/login" estilo="primario" className="w-fit px-5">
            <span>Entrar</span>
          </LinkButton>
        )}
      </div>
    </header>
  );
}

export function EmployeeSidebar() {
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = [
    { href: "/usuarios", label: "Usuários", icon: Users },
    { href: "/agenda", label: "Agenda", icon: Calendar },
    { href: "/cobrancas", label: "Cobranças", icon: DollarSign },
    { href: "/quadras", label: "Quadras", icon: Layers },
    { href: "/horario", label: "Horário", icon: Clock },
  ];

  return (
    <>

      {!isOpen && (
        <SubmitButton
          estilo="fantasma"
          className="fixed top-4 right-4 z-40 bg-gray-900! p-2.5! rounded-xl text-white hover:bg-gray-800 shadow-md"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </SubmitButton>
      )}

      <aside
        ref={menuRef}
        className={`fixed inset-y-0 right-0 z-50 flex h-screen w-64 flex-col justify-between bg-gray-900 text-gray-300 p-4 border-l border-gray-800 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-6">

          <div className="px-2 py-4 border-b border-gray-800 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white block">
              BeachQuadra 
              <span className="text-xs text-blue-400 block font-normal">
                {user?.id_cargo === 3 ? 'Admin' : 'Staff'}
              </span>
            </Link>
            

            <SubmitButton
              estilo="fantasma"
              className="p-1.5! hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </SubmitButton>
          </div>

          {/* Navegação */}
          <nav className="flex flex-col gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-800 hover:text-white transition-all text-sm font-medium"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>


        <div className="border-t border-gray-800 pt-4 space-y-3">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-white truncate">
                {user?.nome}
              </span>
            </div>
          </div>

          <SubmitButton
            estilo="perigo"
            className="w-full flex items-center justify-center gap-2 py-2! rounded-xl!"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            <span>Sair da conta</span>
          </SubmitButton>
        </div>
      </aside>
    </>
  );
}









{/* <nav className="w-full h-14 px-8 flex items-center justify-between bg-[#1F2937] text-gray-200 border-b border-gray-700">

      <div className="flex items-center gap-10">
        <Link href={user && user.id_cargo>1? '/dashboard': '/'} className="text-lg font-semibold tracking-wide text-white">
          BeachQuadra
        </Link>
    
        {user && user.id_cargo > 1 && (
          <NavbarLinks
            className="flex items-center gap-6 text-sm"
          />
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
    </nav> */}