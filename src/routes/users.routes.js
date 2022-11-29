import { Router } from "express";
import { UserController } from "../controllers/userController.js";
const UserRoutes = Router();
/*
passando middleware para todas as rotas do UserRoutes ||
 UserRoutes.use(MyMiddleware)
 => assim o UserRoutes usará para todas as rotas
*/

const Middleware = (request, response, next) => {
  const {isadmin } = request.body;
  if (isadmin === false) {
    return response.status(401).json({ message: "Apenas para usuários adminstradores" });
  }
  next();
};
const userController = new UserController();
UserRoutes.post("/", Middleware, userController.create);
UserRoutes.put("/update/:id", Middleware, userController.update);
export { UserRoutes };