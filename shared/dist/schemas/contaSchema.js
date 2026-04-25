"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.AlterarStatusContaSchema = exports.RedefinirSenhaSchema = exports.AlterarSenhaSchema = exports.ListarContaSchema = exports.CriarContaSchema = void 0;
const zod_1 = require("zod");
exports.CriarContaSchema = zod_1.z.object({
    id_pessoa: zod_1.z.coerce.number(),
    senha: zod_1.z.string().min(6, "Senha deve ter pelo menos 6 caracteres. ")
});
exports.ListarContaSchema = zod_1.z.object({
    id_conta: zod_1.z.coerce.number(),
    id_pessoa: zod_1.z.coerce.number(),
    ativo: zod_1.z.boolean()
});
exports.AlterarSenhaSchema = zod_1.z.object({
    id_conta: zod_1.z.coerce.number(),
    senha: zod_1.z.string().min(6, "Senha deve ter pelo menos 6 caracteres. "),
});
exports.RedefinirSenhaSchema = zod_1.z.object({
    id_conta: zod_1.z.coerce.number(),
});
exports.AlterarStatusContaSchema = zod_1.z.object({
    id_conta: zod_1.z.coerce.number(),
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email inválido"),
    senha: zod_1.z.string().min(6, "Senha deve ter pelo menos 6 caracteres. ")
});
// import {z} from "zod";
// export const ContaBaseSchema = z.object({
// });
// export const NovaContaSchema = ContaBaseSchema.extend({
//   id_pessoa: z.coerce.number(),
//   senha: z
//   .string()
//   .min(6, "Senha deve ter pelo menos 6 caracteres"),
// });
// export const EditarContaSchema = ContaBaseSchema.extend({
//   id_conta: z.coerce.number(),
//   senha: z
//   .string()
//   .optional()
//   .transform((val) => val === "" ? undefined : val)
//   .refine((val) => !val || val.length >= 6, {
//     message: "Senha deve ter pelo menos 6 caracteres",
//   })
// });
// export const listarContaSchema = ContaBaseSchema.extend({
//     id_conta: z.coerce.number(),
//     ativo:z.boolean()
// })
// export const ContaQuerySchema = z.object({
//   search: z.string().optional(),
//   cargo: z.coerce.number().min(1).max(3).optional(),
//   status: z
//     .string()
//     .optional()
//     .transform((val) => {
//         if (val === undefined) return undefined;
//         if (val === "true") return true;
//         if (val === "false") return false;
//         return undefined;
//     }),
// })
// export type ContaDTO = z.infer<typeof listarContaSchema>;
// export type NovaContaDTO = z.infer<typeof NovaContaSchema>;
// export type EditarContaDTO = z.infer<typeof EditarContaSchema>;
// export type ContaQueryDTO = z.infer<typeof ContaQuerySchema>;
