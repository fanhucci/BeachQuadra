import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full">

      <section className="w-full bg-[#1F4E6B] text-white py-20 px-6 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Reserve sua quadra de Beach Tennis em segundos
        </h1>
        <p className="max-w-2xl text-lg mb-8">
          Chega de ligações, grupos de WhatsApp e confusão de horários.
          Veja as quadras disponíveis e faça sua reserva online de forma rápida.
        </p>

        <Link
          href="/login"
          className="bg-white text-[#1F4E6B] px-8 py-3 rounded-md font-semibold hover:opacity-90 transition"
        >
          Fazer minha reserva
        </Link>
      </section>

      <section className="py-16 px-6 max-w-5xl w-full text-center">
        <h2 className="text-3xl font-semibold mb-12">Como funciona</h2>

        <div className="grid md:grid-cols-3 gap-10 text-left">
          <div>
            <h3 className="text-xl font-semibold mb-3">1. Escolha a quadra</h3>
            <p>
              Visualize todas as quadras disponíveis e selecione a que preferir.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">2. Selecione o horário</h3>
            <p>
              Consulte os horários livres em tempo real e escolha o melhor para você.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">3. Confirme a reserva</h3>
            <p>
              Reserve sua quadra em poucos cliques e receba a confirmação instantânea.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12">
            Por que usar nossa plataforma?
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-left">
            <div>
              <h3 className="text-xl font-semibold mb-3">Praticidade</h3>
              <p>Reserve de onde estiver, sem precisar ligar ou esperar resposta.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Organização</h3>
              <p>Todos os horários atualizados em tempo real, sem conflitos.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Rapidez</h3>
              <p>Em menos de 1 minuto sua quadra já está garantida.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Pronto para jogar?
        </h2>
        <Link
          href="/login"
          className="bg-[#1F4E6B] text-white px-10 py-4 rounded-md font-semibold hover:opacity-90 transition"
        >
          Reservar agora
        </Link>
      </section>
    </div>
  );
}