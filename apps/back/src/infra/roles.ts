export enum Permissao {

    //usuarios
    CLIENTES = 'gerenciarClientes',
    FUNCIONARIOS = 'gerenciarFuncionarios',
    ADMINISTRADORES = 'gerenciarAdministradores',

    
    AGENDAMENTOS = 'gerenciarAgendamentos',
    COBRANCAS = 'gerenciarCobrancas',
    OCUPACAO = 'gerenciarOcupacao',
    QUADRAS = 'gerenciarQuadras',

    //horario
    HORARIOS = 'gerenciarHorarioFuncionamento',
    BLOQUEIOS = 'gerenciarBloqueios'
}


export const ROLES_PERMISSIONS: Record<number, Permissao[]> = {
    //Cliente
    1: [
        Permissao.AGENDAMENTOS,
    ], // Cliente

    //Funcionário
    2: [
        Permissao.AGENDAMENTOS, 
        Permissao.QUADRAS, 
        Permissao.COBRANCAS,
        Permissao.OCUPACAO,

        Permissao.FUNCIONARIOS,
        Permissao.CLIENTES
    ],

    //Adminstrador
    3: [
        Permissao.AGENDAMENTOS, 
        Permissao.QUADRAS, 
        Permissao.COBRANCAS,
        Permissao.OCUPACAO,

        Permissao.HORARIOS,
        Permissao.BLOQUEIOS,

        Permissao.ADMINISTRADORES,
        Permissao.FUNCIONARIOS,
        Permissao.CLIENTES
    ]
};