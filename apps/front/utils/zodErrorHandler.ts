import { z, type ZodError } from "zod";

export function formatarErrosZod(error: ZodError) {
    const { fieldErrors } = z.flattenError(error);
  
    return Object.fromEntries(
        Object.entries(fieldErrors).map(([key, value]) => {
            const mensagens = value as string[] | undefined;
            return [key, mensagens?.[0]];
        })
    );
}