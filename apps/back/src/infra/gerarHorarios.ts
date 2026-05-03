export function gerarGradeDeHorarios(numeroDedias: number): Date[] {
    const horarios: Date[] = [];
    const hoje = new Date();
    // Zera as horas em UTC
    hoje.setUTCHours(0, 0, 0, 0);

    const diaSemana = hoje.getUTCDay(); 
    const diferencaParaSegunda = diaSemana === 0 ? 6 : diaSemana - 1;
    
    const inicioDaSemana = new Date(hoje);
    inicioDaSemana.setUTCDate(hoje.getUTCDate() - diferencaParaSegunda);

    for (let d = 0; d < numeroDedias; d++) {
        const dia = new Date(inicioDaSemana);
        dia.setUTCDate(inicioDaSemana.getUTCDate() + d);

        for (let hora = 7; hora <= 23; hora++) {
            const horario = new Date(dia);
            // IMPORTANTE: setUTCHours para garantir que 7h seja 7h UTC
            horario.setUTCHours(hora, 0, 0, 0);
            horarios.push(horario);
        }
    }

    return horarios;
}