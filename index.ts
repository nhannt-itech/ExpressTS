import express from "express";
import { errorHandler } from "./middleware";
import routes from "./routes";
import morgan from "morgan";

const app = express();
const PORT = 8000;

app.use(morgan("tiny"));
app.use(express.json());

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
