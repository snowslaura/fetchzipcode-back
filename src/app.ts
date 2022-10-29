import cors from "cors";
import express from "express";
import "express-async-errors";
import router from "./route/index.js";

// import recommendationRouter from "./routers/recommendationRouter.js";
import dotenv from "dotenv"
// import e2eRouter from "./routers/e2eRouter.js";
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);


// app.use("/recommendations", recommendationRouter);
// app.use(errorHandlerMiddleware);

// if(process.env.NODE_ENV==="test"){
//     app.use(e2eRouter)
//     console.log("Estou no ambiente de testes")
// }

export default app;