'use client';
import { useUser } from "@/context/userContext";
import Link from "next/link";
import { 
  Calendar, Clock, CheckCircle, Users, User, 
  Sun, ArrowRight, Star, 
  MapPin
} from "lucide-react";

export default function HomePage() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white">
        <div className="absolute inset-0 bg-[url('https://grok.x.ai/attachments/c6SWk')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20">
              <Sun className="w-6 h-6 text-orange-400" />
              <span className="font-medium">Beach Tennis • Reserva Rápida</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8">
            Sua quadra de Beach Tennis<br />
            <span className="text-orange-400">esperando por você</span>
          </h1>

          <p className="text-2xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Reserve em segundos. Sem ligações. Sem estresse. Só jogar.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/reservar"
              className="group inline-flex items-center justify-center gap-4 bg-orange-500 hover:bg-orange-600 text-white text-2xl font-semibold px-14 py-7 rounded-3xl transition-all hover:scale-105 shadow-2xl"
            >
              Reservar Quadra Agora
              <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition" />
            </Link>

            <Link
              href="#quadras"
              className="inline-flex items-center justify-center gap-3 border border-white/50 hover:bg-white/10 text-white text-xl font-medium px-10 py-7 rounded-3xl transition"
            >
              Ver Quadras Disponíveis
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 mt-16 text-sm">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" /> <span>4.9/5</span>
            </div>
            <div>2.400+ jogadores felizes</div>
            <div>Horários em tempo real</div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="text-white/70 text-sm">Role para baixo ↓</div>
        </div>
      </section>

      {/* Tipos de Quadras */}
      <section id="quadras" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Escolha como quer jogar</h2>
            <p className="text-xl text-gray-600">Duas modalidades incríveis te esperam</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Individual */}
            <div className="rounded-3xl overflow-hidden shadow-xl group">
              <div className="relative h-[520px]">
                <img 
                  src="https://grok.x.ai/attachments/SGSHv" 
                  alt="Quadra Individual" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-8 left-8 bg-white px-8 py-3 rounded-2xl flex items-center gap-3 text-xl font-semibold shadow-lg">
                  <User className="w-7 h-7" /> Individual
                </div>
              </div>
              <div className="p-10 bg-white">
                <h3 className="text-3xl font-bold mb-3">Quadra Individual</h3>
                <p className="text-gray-600 text-lg">Treino focado, aulas particulares ou jogo intenso.</p>
                <Link
                  href="/reservar"
                  className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl transition font-medium"
                >
                  Reservar Individual →
                </Link>
              </div>
            </div>

            {/* Duplas */}
            <div className="rounded-3xl overflow-hidden shadow-xl group">
              <div className="relative h-[520px]">
                <img 
                  src="https://grok.x.ai/attachments/vlTLQ" 
                  alt="Quadra de Duplas" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-8 left-8 bg-white px-8 py-3 rounded-2xl flex items-center gap-3 text-xl font-semibold shadow-lg">
                  <Users className="w-7 h-7" /> Duplas
                </div>
              </div>
              <div className="p-10 bg-white">
                <h3 className="text-3xl font-bold mb-3">Quadra de Duplas</h3>
                <p className="text-gray-600 text-lg">Diversão garantida com os amigos e família.</p>
                <Link
                  href="/reservar"
                  className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl transition font-medium"
                >
                  Reservar Duplas →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">Super simples de usar</h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto bg-orange-100 rounded-3xl flex items-center justify-center">
                <MapPin className="w-12 h-12 text-orange-500" />
              </div>
              <h3 className="text-2xl font-semibold">1. Escolha a quadra</h3>
              <p className="text-gray-600">Fotos, localização e disponibilidade em tempo real.</p>
            </div>
            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto bg-orange-100 rounded-3xl flex items-center justify-center">
                <Clock className="w-12 h-12 text-orange-500" />
              </div>
              <h3 className="text-2xl font-semibold">2. Escolha o horário</h3>
              <p className="text-gray-600">Calendário ao vivo. Sem surpresas.</p>
            </div>
            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto bg-orange-100 rounded-3xl flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-orange-500" />
              </div>
              <h3 className="text-2xl font-semibold">3. Confirme</h3>
              <p className="text-gray-600">Reserva garantida em menos de 1 minuto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - Mais suave e harmonioso */}
      <section className="py-28 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Bora jogar hoje?
          </h2>
          <p className="text-2xl text-orange-100 mb-12">
            Não perca seu horário favorito. As quadras estão enchendo rápido!
          </p>

          <Link
            href="/reservar"
            className="inline-flex items-center gap-4 bg-white text-orange-700 hover:bg-white hover:text-orange-600 text-3xl font-bold px-16 py-8 rounded-3xl transition-all hover:scale-105 shadow-2xl"
          >
            Reservar Quadra Agora
            <ArrowRight className="w-10 h-10" />
          </Link>

          <p className="mt-8 text-orange-200">Muitos horários estão sendo reservados neste momento</p>
        </div>
      </section>
    </div>
  );
}