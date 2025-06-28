import { Router } from "express";
import { signup, login, getUserInfoFunction } from "../../controllers/admin_controllers/AuthAdminController.js";
import { verifyToken } from "../../middlewares/AuthMiddlewares.js";



const authAdminRouters = Router();

authAdminRouters.post("/signup",signup);
authAdminRouters.post("/login",login);
authAdminRouters.get("/user-info",verifyToken, getUserInfoFunction)


export default authAdminRouters;