import express from "express";
import { UserController, TaskController } from "../controllers";
import { auth } from "../middleware";
import { ValidateUser, ValidateTask } from "../middleware/validate";

const routes = express.Router();

routes.post("/user/register", ValidateUser.register, UserController.register);
routes.post("/user/login", UserController.login);
routes.get("/user/profile", auth(["user"]), UserController.profile);

routes.post("/task", auth(), ValidateTask.create, TaskController.create);
routes.put("/task", auth(), TaskController.update);
routes.delete("/task", auth(), TaskController.delete);
routes.get("/task", TaskController.search);

export default routes;
