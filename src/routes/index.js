import { Router } from "express";
import {UserRoutes} from './users.routes.js'
const routes = Router();

routes.use('/users', UserRoutes)

export {routes}