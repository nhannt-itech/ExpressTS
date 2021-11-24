import express from "express";
import UserController from "../controllers/user";

const routes = express.Router();

routes.post("/user", UserController.register);

export default routes;
