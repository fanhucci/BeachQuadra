import { TransactionSql } from "postgres";
import sql from "../infra/db";
import CobrancaRepository from "../repositories/cobrancaRepository";
import AgendamentoRepository from "../repositories/agendamentoRepository";
import ReservaRepository from "../repositories/reservasRepository";

export default class CobrancaService{
    private cobranca = new CobrancaRepository();
    private agendamento = new AgendamentoRepository();
    private reserva = new ReservaRepository();

    async listarCobrancas(){
        return await this.cobranca.listarCobrancas();
    }

    async listarCobrancasPorId(id:number){
        return await this.cobranca.listarCobrancasPorId(id);
    }

    async pagarCobranca(id:number){

        return await sql.begin(async(tx)=>{
            const id_agendamento = await this.cobranca.pagarCobrancaPorId(tx,id);

            const resultado = await this.agendamento.alterarStatusAgendamento(tx,id_agendamento,'concluido');
            
            return resultado;
        });

    }

    async cancelarCobranca(id:number){

        return await sql.begin(async(tx)=>{
            const id_agendamento = await this.cobranca.cancelarCobrancaPorId(tx,id);

            const resultado = await this.agendamento.alterarStatusAgendamento(tx,id_agendamento,'cancelado');

            await this.reserva.cancelarReservas(tx,id_agendamento);

            return resultado;
        });

    }

    async estornarCobranca(id:number){

        return await sql.begin(async(tx)=>{
            const id_agendamento = await this.cobranca.estornarCobrancaPorId(tx,id);

            const resultado = await this.agendamento.alterarStatusAgendamento(tx,id_agendamento,'cancelado');

            await this.reserva.cancelarReservas(tx,id_agendamento);

            return resultado;
        });

    }

    async expirarCobranca(id:number){

        return await sql.begin(async(tx)=>{
            const id_agendamento = await this.cobranca.expirarCobrancaPorId(tx,id);

            const resultado = await this.agendamento.alterarStatusAgendamento(tx,id_agendamento,'cancelado');

            await this.reserva.cancelarReservas(tx,id_agendamento);

            return resultado;
        });

    }
}