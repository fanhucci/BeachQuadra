import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col text-[#1F4E6B] gap-3 p-2">
      <Link href={'/clientes'}>Clientes</Link>
      <Link href={'/quadras'}>Quadras</Link>
      <Link href={'/usuarios'}>Usuários</Link>
      <Link href={'/horario'}>Horário de Funcionamento</Link>
    </div>
  );
}
