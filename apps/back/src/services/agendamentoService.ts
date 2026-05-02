import AppError from "../infra/appError";
import sql from "../infra/db";
import AgendamentoRepository from "../repositories/agendamentoRepository";
import HorarioRepository from "../repositories/horarioRepository";
import ReservaRepository from "../repositories/reservasRepository";
import {NovoAgendamentoDTO, AlterarAgendamentoDTO, NovaReservaDTO } from '@app/shared';

export default class AgendamentoService{
    private agenda = new AgendamentoRepository();
    private reserva = new ReservaRepository();
    private horario = new HorarioRepository();

    async criarNovoAgendamento(dados:NovoAgendamentoDTO){
        const reservas = dados.reservas;
        const quadras = reservas.map((r:NovaReservaDTO) => r.id_quadra);

        return await sql.begin(async(tx)=>{
        
            for(const r of reservas){

                const permitido = await this.horario.horarioPermitido(tx,r.horario);

                if(!permitido) throw new AppError('Hórario inválido para reserva',403);
            }

            const total = await this.agenda.calcularTotal(tx,quadras);

            const id_agendamento = await this.agenda.novoAgendamento(tx,dados,total);

            for(const r of reservas){
                await this.reserva.criarReserva(tx,id_agendamento,r);
            }

            return id_agendamento;
        });
    }

    async alterarStatusAgendamento(dados:AlterarAgendamentoDTO){
        const {id_agendamento, status} = dados;

        return await sql.begin(async(tx)=>{

            await this.agenda.alterarStatusAgendamento(tx,id_agendamento,status);

            if (status === 'cancelado'){
                await this.reserva.cancelarReservas(tx,id_agendamento);
            }

        })
    }
}