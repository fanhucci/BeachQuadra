"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarPessoaViewSchema = exports.AlterarPessoaSchema = exports.ListarPessoaSchema = exports.PessoaQuerySchema = exports.CriarPessoaSchema = void 0;
const zod_1 = require("zod");
exports.CriarPessoaSchema = zod_1.z.object({
    nome: zod_1.z.string().min(4, "Nome precisa ter no minimo 4 caracteres"),
    cpf: zod_1.z.string().length(11, "CPF Inválido").regex(/^\d+$/),
    email: zod_1.z.string().email("E-mail inválido"),
    telefone: zod_1.z.string().min(9, "Telefone inválido").regex(/^\d+$/),
    id_cargo: zod_1.z.coerce.number().min(1, "Selecione um cargo"),
});
exports.PessoaQuerySchema = zod_1.z.object({
    search: zod_1.z.string().optional(),
    tipo: zod_1.z.coerce.number().min(1).max(3),
    id_cargo: zod_1.z.coerce.number().optional(),
    ativo: zod_1.z
        .string()
        .optional()
        .transform((val) => {
        if (val === undefined)
            return undefined;
        if (val === "true")
            return true;
        if (val === "false")
            return false;
        return undefined;
    }),
});
exports.ListarPessoaSchema = zod_1.z.object({
    id_pessoa: zod_1.z.coerce.number(),
    nome: zod_1.z.string(),
    cpf: zod_1.z.string(),
    email: zod_1.z.string(),
    telefone: zod_1.z.string(),
    id_cargo: zod_1.z.coerce.number(),
    ativo: zod_1.z.boolean()
});
exports.AlterarPessoaSchema = zod_1.z.object({
    id_pessoa: zod_1.z.coerce.number(),
    nome: zod_1.z.string().min(4, "Nome precisa ter no minimo 4 caracteres").optional(),
    cpf: zod_1.z.string().length(11, "CPF Inválido").regex(/^\d+$/).optional(),
    email: zod_1.z.string().email("E-mail inválido").optional(),
    telefone: zod_1.z.string().min(9, "Telefone inválido").regex(/^\d+$/).optional(),
    id_cargo: zod_1.z.coerce.number().min(1, "Selecione um cargo").optional(),
    ativo: zod_1.z.boolean().optional()
});
exports.ListarPessoaViewSchema = zod_1.z.object({
    id_pessoa: zod_1.z.coerce.number(),
    id_conta: zod_1.z.coerce.number(),
    id_cargo: zod_1.z.coerce.number(),
    nome: zod_1.z.string(),
    cpf: zod_1.z.string(),
    email: zod_1.z.string(),
    telefone: zod_1.z.string(),
    cargo: zod_1.z.string(),
    ativo: zod_1.z.boolean(),
});
