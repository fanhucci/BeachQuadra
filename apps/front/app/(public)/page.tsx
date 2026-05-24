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
      <section className="pt-24 pb-24 md:pt-32 md:pb-32 relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1622290291469-0f5e1c2a5e3e')] bg-cover bg-center opacity-20" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-full mb-8">
            🏖️ Beach Tennis • Reserva Instantânea
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8 text-white">
            Reserve sua quadra de<br />
            <span className="text-orange-400">Beach Tennis</span> em segundos
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12">
            Acabe com ligações, mensagens e confusão de horários. 
            Veja quadras disponíveis e reserve com poucos cliques.
          </p>

          <Link
            href="/reservar"
            className="inline-flex items-center gap-4 bg-white text-blue-950 hover:bg-orange-400 hover:text-white text-xl font-semibold px-12 py-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Fazer minha reserva agora
            <ArrowRight className="w-7 h-7" />
          </Link>

          <p className="text-blue-200 mt-8 text-sm">+2.400 reservas realizadas esta semana</p>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Tipos de Quadras */}
      <section id="quadras" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Escolha seu estilo de jogo</h2>
          <p className="text-gray-600 text-center mb-14 text-lg">Duas modalidades para diferentes formas de jogar</p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Individual */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="h-96 relative">
                <img 
                  src="https://grok.x.ai/attachments/SGSHv" 
                  alt="Quadra Individual" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-8 left-8 bg-white/95 backdrop-blur px-6 py-2 rounded-2xl flex items-center gap-3 text-gray-800 font-semibold shadow">
                  <User className="w-6 h-6" /> Individual
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-bold mb-4">Quadra Individual</h3>
                <p className="text-gray-600 text-lg">Perfeita para treinos, aulas particulares e quem quer jogar com alta intensidade.</p>
              </div>
            </div>

            {/* Duplas */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="h-96 relative">
                <img 
                  src="https://grok.x.ai/attachments/vlTLQ" 
                  alt="Quadra de Duplas" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-8 left-8 bg-white/95 backdrop-blur px-6 py-2 rounded-2xl flex items-center gap-3 text-gray-800 font-semibold shadow">
                  <Users className="w-6 h-6" /> Duplas
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-bold mb-4">Quadra de Duplas</h3>
                <p className="text-gray-600 text-lg">Diversão garantida! Ideal para jogar com amigos e família.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Como funciona?</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: MapPin, title: "Escolha a quadra", desc: "Visualize fotos, localização e disponibilidade em tempo real." },
              { icon: Clock, title: "Selecione o horário", desc: "Horários atualizados ao vivo. Escolha o que melhor te atende." },
              { icon: CheckCircle, title: "Confirme a reserva", desc: "Pagamento seguro e confirmação instantânea." }
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-24 h-24 mx-auto mb-8 bg-blue-100 rounded-3xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <step.icon className="w-12 h-12 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vantagens */}
      <section id="vantagens" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Por que escolher a BeachQuadra?</h2>
          <p className="text-gray-600 mb-16">Facilidade, transparência e agilidade para você</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-10 rounded-3xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
              <Trophy className="w-14 h-14 text-orange-500 mx-auto mb-6" />
              <h4 className="text-2xl font-semibold mb-3">Praticidade Total</h4>
              <p className="text-gray-600">Reserve de onde estiver, sem precisar ligar ou esperar resposta.</p>
            </div>

            <div className="bg-gray-50 p-10 rounded-3xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
              <Calendar className="w-14 h-14 text-orange-500 mx-auto mb-6" />
              <h4 className="text-2xl font-semibold mb-3">Horários em Tempo Real</h4>
              <p className="text-gray-600">Sem sobreposições ou horários duplicados.</p>
            </div>

            <div className="bg-gray-50 p-10 rounded-3xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
              <Sun className="w-14 h-14 text-orange-500 mx-auto mb-6" />
              <h4 className="text-2xl font-semibold mb-3">Rápido e Confiável</h4>
              <p className="text-gray-600">Reserva confirmada em menos de 60 segundos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-28 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Pronto para jogar?</h2>
          <p className="text-xl mb-12 text-blue-100">Escolha seu horário e garanta sua quadra agora mesmo.</p>
          
          <Link
            href="/reservar"
            className="inline-flex items-center gap-4 bg-white text-blue-700 hover:bg-orange-400 hover:text-white text-2xl font-bold px-14 py-7 rounded-3xl transition-all hover:scale-105 shadow-2xl"
          >
            Reservar Agora
            <ArrowRight className="w-8 h-8" />
          </Link>
        </div>
      </section>
    </div>
  );
}