"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarQuadraSchema = exports.NovaQuadraSchema = exports.QuadraSchema = void 0;
const zod_1 = require("zod");
exports.QuadraSchema = zod_1.z.object({
    id_quadra: zod_1.z.coerce.number(),
    nome: zod_1.z.string(),
    tipo: zod_1.z.string(),
    status: zod_1.z.string(),
    valor: zod_1.z.coerce.number()
});
exports.NovaQuadraSchema = exports.QuadraSchema.omit({
    id_quadra: true
});
exports.EditarQuadraSchema = exports.QuadraSchema.required({
    id_quadra: true
});
