export function gerarGradeDeHorarios(numeroDedias: number): Date[] {
    const horarios: Date[] = [];
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const diaSemana = hoje.getDay(); 
    const diferencaParaSegunda = diaSemana === 0 ? 6 : diaSemana - 1;
    
    const inicioDaSemana = new Date(hoje);
    inicioDaSemana.setDate(hoje.getDate() - diferencaParaSegunda);

    for (let d = 0; d < numeroDedias; d++) {
        const dia = new Date(inicioDaSemana);
        dia.setDate(inicioDaSemana.getDate() + d);

        for (let hora = 7; hora <= 23; hora++) {
            const horario = new Date(dia);
            horario.setHours(hora, 0, 0, 0);
            horarios.push(horario);
        }
    }

    return horarios;
}