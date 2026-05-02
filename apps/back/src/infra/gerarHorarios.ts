export function gerarGradeDeHorarios(dias: number) {
    const horarios: Date[] = [];
    const agora = new Date();
    agora.setMinutes(0, 0, 0);

    for (let i = 0; i < dias * 24; i++) {
        const h = new Date(agora);
        h.setHours(h.getHours() + i);
        horarios.push(h);
    }
    return horarios;
}