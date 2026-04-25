"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioQuerySchema = exports.listarUsuarioSchema = exports.EditarUsuarioSchema = exports.NovoUsuarioSchema = exports.UsuarioBaseSchema = void 0;
const zod_1 = require("zod");
exports.UsuarioBaseSchema = zod_1.z.object({
    usuario: zod_1.z
        .string()
        .min(5, "Usuário deve ter pelo menos 5 caracteres")
        .trim(),
    cargo: zod_1.z
        .coerce
        .number().int("Escolha um cargo válido").min(1).max(3),
});
exports.NovoUsuarioSchema = exports.UsuarioBaseSchema.extend({
    senha: zod_1.z
        .string()
        .min(6, "Senha deve ter pelo menos 6 caracteres"),
});
exports.EditarUsuarioSchema = exports.UsuarioBaseSchema.extend({
    id_usuario: zod_1.z.coerce.number(),
    senha: zod_1.z
        .string()
        .optional()
        .transform((val) => val === "" ? undefined : val)
        .refine((val) => !val || val.length >= 6, {
        message: "Senha deve ter pelo menos 6 caracteres",
    })
});
exports.listarUsuarioSchema = exports.UsuarioBaseSchema.extend({
    id_usuario: zod_1.z.coerce.number(),
    ativo: zod_1.z.boolean()
});
exports.UsuarioQuerySchema = zod_1.z.object({
    search: zod_1.z.string().optional(),
    cargo: zod_1.z.coerce.number().min(1).max(3).optional(),
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
});
