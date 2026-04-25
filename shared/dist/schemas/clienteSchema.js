"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarClienteSchema = exports.NovoClienteSchema = exports.ClienteSchema = void 0;
const zod_1 = require("zod");
exports.ClienteSchema = zod_1.z.object({
    id_cliente: zod_1.z.coerce.number().nullish(),
    nome: zod_1.z.string(),
    cpf: zod_1.z.string(),
    telefone: zod_1.z.string(),
    usuario: zod_1.z.coerce.number().optional().nullable()
});
exports.NovoClienteSchema = exports.ClienteSchema.omit({ id_cliente: true });
exports.EditarClienteSchema = exports.ClienteSchema.required({ id_cliente: true });
