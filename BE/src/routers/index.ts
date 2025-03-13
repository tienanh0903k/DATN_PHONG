import express from "express";
import authRouters from "./authRouter";
import serviceRouter from "./serviceRouter";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouters);
rootRouter.use("/service", serviceRouter);

export default rootRouter;
