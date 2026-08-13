# BeachQuadra - Sistema de Gerenciamento de Quadras de Beach Tennis

> Sistema completo e centralizado para gestão de agendamentos, reservas, disponibilidade de quadras, contas a receber e controle de acesso para arenas e clubes de *Beach Tennis*.

---

## Visão Geral

O **BeachQuadra** é uma solução de software projetada para otimizar o uso de quadras de *Beach Tennis*, reduzir conflitos de agendamento, automatizar fluxos financeiros de cobrança e oferecer relatórios de ocupação e faturamento para os gestores.

### O que o sistema faz:
-  **Gestão de Quadras**: Cadastro, edição, listagem e exclusão lógica de quadras (com validação de reservas ativas).
-  **Gestão de Usuários e Perfis**: Controle de usuários (Administrador, Funcionário, Cliente) com autenticação via e-mail e senha com *hash*.
-  **Grade de Horários e Exceções**: Configuração de horários de funcionamento semanais e bloqueios pontuais (feriados/manutenção).
-  **Agendamentos e Reservas**: Criação de agendamentos contendo múltiplas reservas (com duração fixa de 1 hora) e verificação de disponibilidade em tempo real.
-  **Contas a Receber**: Geração automática de cobranças vinculadas aos agendamentos, controle de status e histórico financeiro.
-  **Agenda Interativa**: Calendário visual para acompanhamento da ocupação em tempo real.
-  **Relatórios Gerenciais**: Análise de ocupação, histórico por cliente e balanço financeiro.


## Objetivos e Metas

- **Objetivo Principal**: Automatizar o fluxo de reservas de quadras.
- **Meta de Ocupação**: Maior ocupação média das quadras nos horários operacionais.
- **Eficiência Operacional**: Reduzir o tempo gasto no agendamento manual.

---

## Arquitetura e Tecnologias

O projeto utiliza uma arquitetura baseada em **Monorepo / Workspaces** com desacoplamento entre frontend e backend.

- **Frontend**: Aplicação Web Reativa (React / Next.js) hospedada na Vercel.
- **Backend**: API RESTful em Node.js (TypeScript) com autenticação e validações de regras de negócio.
- **Banco de Dados**: SGBD Relacional (PostgreSQL) utilizando da infraestrutura da Supabase.


---




