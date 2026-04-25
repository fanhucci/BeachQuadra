"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadraQuerySchema = exports.ListarQuadraSchema = exports.QuadraBaseSchema = void 0;
const zod_1 = require("zod");
exports.QuadraBaseSchema = zod_1.z.object({
    nome: zod_1.z
        .string()
        .min(2, "Nome deve ter pelo menos 2 caracteres"),
    tipo: zod_1.z
        .string(),
    status: zod_1.z
        .boolean(),
    valor: zod_1.z
        .coerce
        .number()
        .positive("Valor precisa ser positivo")
        .min(1, "Valor precisa ser maior que 0")
});
exports.ListarQuadraSchema = exports.QuadraBaseSchema.extend({
    id_quadra: zod_1.z.coerce.number().int()
});
exports.QuadraQuerySchema = zod_1.z.object({
    search: zod_1.z.string().optional(),
    tipo: zod_1.z.string().optional(),
    status: zod_1.z
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
    })
});
