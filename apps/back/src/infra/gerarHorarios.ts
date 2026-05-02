export function gerarGradeDeHorarios(proximosDias: number = 14): Date[] {
    const horarios: Date[] = [];
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); 

    for (let d = 0; d < proximosDias; d++) {
        const dia = new Date(hoje);
        dia.setDate(dia.getDate() + d);

        for (let hora = 7; hora <= 22; hora++) {  
            const horario = new Date(dia);
            horario.setHours(hora, 0, 0, 0);
            horarios.push(horario);
        }
    }

    return horarios;
}