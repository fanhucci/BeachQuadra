"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarUsuarioSchema = exports.NovoUsuarioSchema = exports.UsuarioSchema = void 0;
const zod_1 = require("zod");
exports.UsuarioSchema = zod_1.z.object({
    id: zod_1.z.coerce.number(),
    usuario: zod_1.z.string().min(1),
    senha: zod_1.z.string().min(1),
    cargo: zod_1.z.coerce.number().int().min(1).max(3)
});
exports.NovoUsuarioSchema = exports.UsuarioSchema
    .omit({ id: true });
exports.EditarUsuarioSchema = exports.UsuarioSchema
    .required({ id: true });
