import { Request, Response, NextFunction } from "express";
import  AppError  from "../infra/appError";
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      erro: err.message,
    });
  }

  return res.status(500).json({
    erro: "Erro interno",
  });
}