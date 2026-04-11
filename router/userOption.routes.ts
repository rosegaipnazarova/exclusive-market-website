import { Router, type RequestHandler } from "express";
import { getUserOptions } from "../controller/userOption.controller.js";

const userOptionRouter: Router = Router();

userOptionRouter.get("/get_user_options", getUserOptions as RequestHandler);

export default userOptionRouter;
