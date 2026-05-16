import AppError from "../infra/appError";
import sql from "../infra/db";
import AgendamentoRepository from "../repositories/agendamentoRepository";
import CobrancaRepository from "../repositories/cobrancaRepository";
import HorarioRepository from "../repositories/horarioRepository";
import ReservaRepository from "../repositories/reservasRepository";
import {NovoAgendamento, EditarAgendamento, NovaReserva } from '@app/shared';

export default class AgendamentoService{
    private agenda = new AgendamentoRepository();
    private reserva = new ReservaRepository();
    private horario = new HorarioRepository();
    private cobranca = new CobrancaRepository();

    async listarAgendamentos(){
        return await this.agenda.listarAgendamentos();
    }

    async buscarAgendamentoPorId(id:number){
        return await this.agenda.buscarAgendamentoPorId(id);
    }

    async criarNovoAgendamento(dados:NovoAgendamento){
        const reservas = dados.reservas;
        const quadras = reservas.map((r:NovaReserva) => r.id_quadra);
        const horarios = reservas.map((h:NovaReserva)=>h.horario);

        const resposta = await this.horario.validarHorarios(horarios);

        const horarioInvalido = resposta.some(h=>!h.permitido);

        if(horarioInvalido) throw new AppError('Hórario indisponível para reserva',403);

        const total = await this.agenda.calcularTotal(quadras);

        return await sql.begin(async(tx)=>{
        
            const id_agendamento = await this.agenda.novoAgendamento(tx,dados,total);

            await this.reserva.criarReserva(tx,id_agendamento,horarios,quadras);
            
            await this.cobranca.novaCobranca(tx,id_agendamento, dados.id_pessoa, total);

            return id_agendamento;
        });
    }

    async alterarStatusAgendamento(dados:EditarAgendamento){
        const {id_agendamento, status} = dados;

        return await sql.begin(async(tx)=>{

            const resultado = await this.agenda.alterarStatusAgendamento(tx,id_agendamento,status);

            if (status === 'cancelado'){
                await this.reserva.cancelarReservas(tx,id_agendamento);
            }

            return resultado;
        })
    }
}