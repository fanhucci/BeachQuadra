import express, { Request, Response } from "express";
import pessoaRouter from "./routes/pessoaRoute";
import quadraRouter from "./routes/quadraRoute";
import contaRouter from "./routes/contaRoute";
import horarioRouter from "./routes/horarioRoute";
import usuarioRouter from "./routes/usuarioRoute";
import authRouter from "./routes/authRoute";
import cookieParser from "cookie-parser";


import cors from 'cors';
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'https://beach-quadra-front.vercel.app',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(pessoaRouter);
app.use(quadraRouter);
app.use(contaRouter);
app.use(horarioRouter);
app.use(usuarioRouter);
app.use(authRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Servidor rodando com Express + TypeScript 🚀" });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});