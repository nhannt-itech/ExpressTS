import express from "express";
import UserController from "../controllers/user";
import { auth } from "../middleware";
import { ValidateUser } from "../middleware/validate";

const routes = express.Router();

routes.post("/user/register", ValidateUser.register, UserController.register);
routes.post("/user/login", UserController.login);
routes.get("/user/profile", auth(["user"]), UserController.profile);

export default routes;
