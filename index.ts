import express from "express";
import { errorHandler } from "./middleware";
import routes from "./routes";
import morgan from "morgan";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 8000;

import passport from "./middleware/passport/config";
app.use(morgan("tiny"));
app.use(express.json());
app.use(passport.initialize());

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
