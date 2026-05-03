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

    async listarAgendamentoPorId(id:number){
        return await this.agenda.listarAgendamentoPorId(id);
    }

    async criarNovoAgendamento(dados:NovoAgendamentoDTO){
        const reservas = dados.reservas;
        const quadras = reservas.map((r:NovaReservaDTO) => r.id_quadra);
        const horarios = reservas.map((h:NovaReservaDTO)=>h.horario);

        const resposta = await this.horario.retornarHorariosPermitidos(horarios);

        const horarioInvalido = resposta.some(h=>!h.permitido);

        if(horarioInvalido) throw new AppError('Hórario indisponível para reserva',403);

        const total = await this.agenda.calcularTotal(quadras);

        return await sql.begin(async(tx)=>{
        
            const id_agendamento = await this.agenda.novoAgendamento(tx,dados,total);

            await this.reserva.criarReserva(tx,id_agendamento,horarios,quadras);
            
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