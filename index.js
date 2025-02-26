import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import "./model/index.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import router from "./routes/indexRoute.js";
import indexRouter from "./routes/indexRoute.js";
import authRouter from "./routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(indexRouter);
app.use(authRouter)
app.use(userRouter);
app.use(productRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on http://localhost:` + port);
});
