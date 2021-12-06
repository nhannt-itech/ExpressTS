import express from "express";
import { errorHandler } from "./middleware";
import adminRoutes from "./routes/admin";
import * as dotenv from "dotenv";

dotenv.config();

export const app = express();

const port = process.env.PORT || 8000;

import passport from "./middleware/passport/config";
app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/home", (req, res) => {
	res.send("Home");
});

app.use("/admin", adminRoutes);

app.use(errorHandler);

app.listen(port, () => {
	console.log("App is running on port " + port);
});
