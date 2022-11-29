import 'express-async-errors'
import { migrationsRunning} from "./database/sqlite/migrations/index.js";
import express from "express";
import { AppError } from "./utils/app.error.js";
import { routes } from "./routes/index.js";
const app = express();
app.use(express.json());
migrationsRunning(); // conexão com o banco;
app.use(routes);
app.listen(4000, () => {
  console.log("server running on port 4000");
});
app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    //  se o erro for do tipo AppError
    return res.status(err.status).json({
      status: "erro",
      message: err.message,
    });
  }
  console.log(err);
  // se não for lança o erro do servidor
  return res.status(500).json({
    status: "error",
    message: "Internal Erro",
  });
});
/*
*/