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
    <div className="flex flex-1 flex-col bg-white text-gray-900">
      {/* Hero Section */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-28 relative bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1622290291469-0f5e1c2a5e3e')] bg-cover bg-center opacity-10" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-5 py-2 rounded-full mb-6 font-medium">
            🏖️ Beach Tennis • Reserva Rápida
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Sua quadra de <span className="text-[#FF70B8]">Beach Tennis</span><br />
            reservada em <span className="text-gray-900">segundos</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10">
            Nada de ligações, mensagens ou confusão de horários. 
            Veja as quadras livres e reserve online de forma simples e rápida.
          </p>

          <Link
            href="/reservar"
            className="inline-flex items-center gap-3 bg-[#FF70B8] hover:bg-[#00B85C] text-white text-xl font-semibold px-10 py-5 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            Fazer minha reserva agora
            <ArrowRight className="w-6 h-6" />
          </Link>

          <p className="text-sm text-gray-500 mt-6">Mais de 2.400 jogadores reservando esta semana</p>
        </div>
      </section>

      {/* Tipos de Quadras */}
      <section id="quadras" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Escolha seu estilo de jogo
          </h2>
          <p className="text-gray-600 text-center mb-12">Quadras preparadas para todos os níveis</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Quadra Individual */}
            <div className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-[#FF70B8] transition-all duration-300">
              <div className="h-80 relative">
                <img 
                  src="https://grok.x.ai/attachments/SGSHv" 
                  alt="Quadra Individual" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-1 rounded-full text-sm font-semibold flex items-center gap-2 text-gray-800">
                  <User className="w-5 h-5 text-[#FF70B8]" /> Individual
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">Quadra Individual</h3>
                <p className="text-gray-600">Perfeita para treinos intensos, aulas particulares ou quem quer jogar mais agressivo.</p>
              </div>
            </div>

            {/* Quadra de Duplas */}
            <div className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-[#FF70B8] transition-all duration-300">
              <div className="h-80 relative">
                <img 
                  src="https://grok.x.ai/attachments/vlTLQ" 
                  alt="Quadra de Duplas" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-1 rounded-full text-sm font-semibold flex items-center gap-2 text-gray-800">
                  <Users className="w-5 h-5 text-[#FF70B8]" /> Duplas
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">Quadra de Duplas</h3>
                <p className="text-gray-600">A mais divertida! Ideal para jogar com amigos e família.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Como funciona?</h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-pink-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                <MapPin className="w-10 h-10 text-[#FF70B8]" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">1. Escolha a quadra</h3>
              <p className="text-gray-600">Visualize todas as quadras disponíveis com fotos e detalhes em tempo real.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-pink-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                <Clock className="w-10 h-10 text-[#FF70B8]" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">2. Selecione o horário</h3>
              <p className="text-gray-600">Horários atualizados ao vivo. Escolha o melhor para você.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-pink-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                <CheckCircle className="w-10 h-10 text-[#FF70B8]" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">3. Confirme</h3>
              <p className="text-gray-600">Pagamento seguro e reserva confirmada instantaneamente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Por que usar */}
      <section id="vantagens" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Por que usar nossa plataforma?</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-[#FF70B8] transition">
              <Trophy className="w-12 h-12 text-[#FF70B8] mx-auto mb-6" />
              <h4 className="text-xl font-semibold mb-3">Praticidade Total</h4>
              <p className="text-gray-600">Reserve de qualquer lugar, a qualquer hora, pelo celular.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-[#FF70B8] transition">
              <Calendar className="w-12 h-12 text-[#FF70B8] mx-auto mb-6" />
              <h4 className="text-xl font-semibold mb-3">Horários em Tempo Real</h4>
              <p className="text-gray-600">Sem conflitos ou horários duplicados.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-[#FF70B8] transition">
              <Sun className="w-12 h-12 text-[#FF70B8] mx-auto mb-6" />
              <h4 className="text-xl font-semibold mb-3">Rápido e Seguro</h4>
              <p className="text-gray-600">Em menos de 1 minuto sua reserva está confirmada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-r from-[#FF70B8] to-[#00B85C] text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-6">Bora jogar hoje?</h2>
          <p className="text-xl mb-10">Não perca seu horário favorito. As quadras estão enchendo rápido!</p>
          
          <Link
            href="/reservar"
            className="inline-flex items-center gap-3 bg-white text-gray-900 text-xl font-bold px-12 py-6 rounded-2xl hover:bg-gray-100 transition-all hover:scale-105"
          >
            Reservar Agora
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </section>
    </div>
  );
}