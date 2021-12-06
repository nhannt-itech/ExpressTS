import express from "express";
import { errorHandler } from "./middleware";
import adminRoutes from "./routes/admin";
import morgan from "morgan";
import * as dotenv from "dotenv";

dotenv.config();

export const app = express();

const port = process.env.PORT || 8000;

import passport from "./middleware/passport/config";
app.use(morgan("tiny"));
app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/admin", adminRoutes);

app.use(errorHandler);

app.listen(port, () => {
	console.log("App is running on port " + port);
});
