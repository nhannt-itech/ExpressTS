import express from "express";
import { UserController, TaskController } from "../controllers";
import { auth } from "../middleware";
import { ValidateUser, ValidateTask } from "../middleware/validate";
import { Role } from "../constants";

const routes = express.Router();

routes.post("/user/register", ValidateUser.register, UserController.register);
routes.post("/user/login", UserController.login);
routes.get("/user/profile", auth(), UserController.profile);
routes.delete("/user", auth(Role.ADMIN), UserController.delete);

routes.post("/task", auth(), ValidateTask.create, TaskController.create);
routes.put("/task", auth(Role.MOD), TaskController.update);
routes.delete("/task", auth(Role.MOD), TaskController.delete);
routes.get("/task", TaskController.search);

export default routes;
