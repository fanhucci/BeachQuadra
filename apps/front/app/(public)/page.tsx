'use client';
import { useUser } from "@/context/userContext";
import Link from "next/link";
import { 
  Calendar, Clock, CheckCircle, Users, User, 
  Sun, MapPin, Trophy, ArrowRight 
} from "lucide-react";

export default function HomePage() {
  const { user } = useUser();

  return (
    <div className="flex flex-1 flex-col bg-zinc-950 text-white">
      {/* Hero Section */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-28 relative bg-gradient-to-br from-zinc-900 via-orange-950 to-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1622290291469-0f5e1c2a5e3e')] bg-cover bg-center opacity-30" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-6 border border-white/20">
            <span className="text-orange-400">🏖️</span>
            <span className="text-sm font-medium">Beach Tennis • Reserva Rápida</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Sua quadra de <span className="text-orange-400">Beach Tennis</span><br />
            reservada em <span className="text-white">segundos</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-10">
            Nada de ligações, mensagens ou confusão de horários. 
            Veja as quadras livres e reserve online de forma simples e rápida.
          </p>

          <Link
            href="/reservar"
            className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white text-xl font-semibold px-10 py-5 rounded-2xl transition-all hover:scale-105 active:scale-95"
          >
            Fazer minha reserva agora
            <ArrowRight className="w-6 h-6" />
          </Link>

          <p className="text-sm text-zinc-400 mt-6">Mais de 2.400 jogadores reservando esta semana</p>
        </div>
      </section>

      {/* Tipos de Quadras */}
      <section id="quadras" className="py-20 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Escolha seu estilo de jogo</h2>
          <p className="text-zinc-400 text-center mb-12">Quadras preparadas para todos os níveis</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Quadra Individual */}
            <div className="group bg-zinc-800 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300">
              <div className="h-80 relative">
                <img 
                  src="https://grok.x.ai/attachments/SGSHv" 
                  alt="Quadra Individual" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 bg-black/70 px-5 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                  <User className="w-5 h-5" /> Individual
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">Quadra Individual</h3>
                <p className="text-zinc-400">Ideal para treinos, aulas particulares e quem busca mais intensidade no jogo.</p>
              </div>
            </div>

            {/* Quadra de Duplas */}
            <div className="group bg-zinc-800 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300">
              <div className="h-80 relative">
                <img 
                  src="https://grok.x.ai/attachments/vlTLQ" 
                  alt="Quadra de Duplas" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 bg-black/70 px-5 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5" /> Duplas
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">Quadra de Duplas</h3>
                <p className="text-zinc-400">A mais divertida! Perfeita para jogar com amigos e família.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Como funciona?</h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-orange-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                <MapPin className="w-10 h-10 text-orange-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">1. Escolha a quadra</h3>
              <p className="text-zinc-400">Visualize todas as quadras disponíveis com fotos e detalhes em tempo real.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-orange-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                <Clock className="w-10 h-10 text-orange-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">2. Selecione o horário</h3>
              <p className="text-zinc-400">Horários atualizados ao vivo. Escolha o melhor para você.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-orange-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                <CheckCircle className="w-10 h-10 text-orange-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">3. Confirme</h3>
              <p className="text-zinc-400">Pagamento seguro e reserva confirmada em poucos segundos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Por que usar */}
      <section id="vantagens" className="py-20 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Por que usar nossa plataforma?</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-zinc-800 p-8 rounded-3xl">
              <Trophy className="w-12 h-12 text-orange-400 mx-auto mb-6" />
              <h4 className="text-xl font-semibold mb-3">Praticidade Total</h4>
              <p className="text-zinc-400">Reserve de qualquer lugar, a qualquer momento.</p>
            </div>

            <div className="bg-zinc-800 p-8 rounded-3xl">
              <Calendar className="w-12 h-12 text-orange-400 mx-auto mb-6" />
              <h4 className="text-xl font-semibold mb-3">Horários em Tempo Real</h4>
              <p className="text-zinc-400">Sem conflitos ou horários duplicados.</p>
            </div>

            <div className="bg-zinc-800 p-8 rounded-3xl">
              <Sun className="w-12 h-12 text-orange-400 mx-auto mb-6" />
              <h4 className="text-xl font-semibold mb-3">Rápido e Seguro</h4>
              <p className="text-zinc-400">Menos de 1 minuto para confirmar sua reserva.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-6">Bora jogar hoje?</h2>
          <p className="text-xl mb-10">Não perca seu horário favorito. As quadras estão enchendo rápido!</p>
          
          <Link
            href="/reservar"
            className="inline-flex items-center gap-3 bg-white text-zinc-900 text-xl font-bold px-12 py-6 rounded-2xl hover:bg-zinc-100 transition-all hover:scale-105"
          >
            Reservar Agora
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </section>
    </div>
  );
}