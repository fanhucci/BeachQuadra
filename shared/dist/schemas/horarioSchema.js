"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listaEditarHorarioSchema = exports.editarHorarioSchema = exports.horarioSchema = void 0;
const zod_1 = require("zod");
exports.horarioSchema = zod_1.z.object({
    id_horario: zod_1.z.coerce.number(),
    dia_semana: zod_1.z.string(),
    horario_abertura: zod_1.z.string(),
    horario_fechamento: zod_1.z.string(),
    ativo: zod_1.z.boolean()
});
exports.editarHorarioSchema = exports.horarioSchema.omit({
    dia_semana: true
});
exports.listaEditarHorarioSchema = zod_1.z.array(exports.editarHorarioSchema);
