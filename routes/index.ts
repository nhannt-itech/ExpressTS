import express from "express";
import UserController from "../controllers/user";
import auth from "../middleware/auth";

const routes = express.Router();

routes.post("/user", UserController.register);
routes.get("/user", UserController.get);
routes.post("/user/login", UserController.login);
routes.get("/user/profile", auth, UserController.profile);

export default routes;
