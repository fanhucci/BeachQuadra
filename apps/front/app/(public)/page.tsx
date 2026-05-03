import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full text-gray-800">

      <section className="w-full bg-linear-to-b from-[#1F4E6B] to-[#2C7DA0] text-white py-28 px-6 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold max-w-4xl leading-tight">
          Sua quadra de Beach Tennis reservada em segundos
        </h1>

        <p className="max-w-2xl text-lg md:text-xl mt-6 opacity-90">
          Nada de ligações, mensagens ou confusão de horários.
          Veja as quadras livres e reserve online de forma simples e rápida.
        </p>

        <Link
          href="/reservas/cadastrar"
          className="mt-10 bg-white text-[#1F4E6B] px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition"
        >
          Fazer minha reserva
        </Link>
      </section>

      <section className="py-24 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-center mb-16">
          Como funciona
        </h2>

        <div className="grid md:grid-cols-3 gap-16 text-center">
          <div className="space-y-4">
            <div className="text-5xl">🏖️</div>
            <h3 className="text-2xl font-semibold">Escolha a quadra</h3>
            <p className="text-gray-600">
              Visualize todas as quadras disponíveis e selecione a que preferir.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-5xl">⏰</div>
            <h3 className="text-2xl font-semibold">Selecione o horário</h3>
            <p className="text-gray-600">
              Consulte os horários livres em tempo real e escolha o melhor para você.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-5xl">✅</div>
            <h3 className="text-2xl font-semibold">Confirme a reserva</h3>
            <p className="text-gray-600">
              Em poucos cliques sua quadra já está garantida.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F4F7F9] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Por que usar nossa plataforma?
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-3xl shadow-md space-y-3">
              <h3 className="text-xl font-semibold">Praticidade total</h3>
              <p className="text-gray-600">
                Reserve de onde estiver, sem precisar ligar ou esperar resposta.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md space-y-3">
              <h3 className="text-xl font-semibold">Horários sempre atualizados</h3>
              <p className="text-gray-600">
                Nada de conflitos ou horários duplicados.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md space-y-3">
              <h3 className="text-xl font-semibold">Rápido e simples</h3>
              <p className="text-gray-600">
                Em menos de 1 minuto sua reserva está confirmada.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 text-center bg-[#1F4E6B] text-white">
        <h2 className="text-4xl font-bold mb-6">
          Bora jogar hoje?
        </h2>

        <Link
          href="/reservas/cadastrar"
          className="bg-white text-[#1F4E6B] px-12 py-5 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition"
        >
          Reservar agora
        </Link>
      </section>

    </div>
  );
}