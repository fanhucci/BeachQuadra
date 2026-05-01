import sql from "../infra/db";
import AgendamentoRepository from "../repositories/agendamentoRepository";
import ReservaRepository from "../repositories/reservasRepository";
import {NovoAgendamentoDTO, AlterarAgendamentoDTO, NovaReservaDTO } from '@app/shared';

export default class AgendamentoService{
    private agenda = new AgendamentoRepository();
    private reserva = new ReservaRepository();

    async criarNovoAgendamento(dados:NovoAgendamentoDTO){
        const reservas = dados.reservas;
        const quadras = reservas.map((r:NovaReservaDTO) => r.id_quadra);

        return await sql.begin(async(tx)=>{
            const total = await this.agenda.calcularTotal(tx,quadras);

            const id_agendamento = await this.agenda.novoAgendamento(tx,dados,total);

            for(const r of reservas){
                await this.reserva.criarReserva(tx,{
                    id_agendamento,
                    ...r
                });
            }

            return id_agendamento;
        });
    }

    async alterarStatusAgendamento(dados:AlterarAgendamentoDTO){
        const {id_agendamento, status} = dados;
        return await this.agenda.alterarStatusAgendamento(id_agendamento,status);
    }
}