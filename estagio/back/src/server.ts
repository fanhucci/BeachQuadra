import express, { Request, Response } from "express";
import clienteRouter from "./routes/clienteRoute";
import quadraRouter from "./routes/quadraRoute";
import usuarioRouter from "./routes/usuarioRoute";
import horarioRouter from "./routes/horarioRoute";

import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(clienteRouter);
app.use(quadraRouter);
app.use(usuarioRouter);
app.use(horarioRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Servidor rodando com Express + TypeScript 🚀" });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});