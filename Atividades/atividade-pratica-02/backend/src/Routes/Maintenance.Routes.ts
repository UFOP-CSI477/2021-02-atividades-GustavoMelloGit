import { Router } from "express";
import RegisterController from "../controllers/Registers.controller";
import { isAdmin } from "../middlewares/isAdmin";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const route = Router();

route.post("/new", isAuthenticated, isAdmin, RegisterController.create);
route.get("/", RegisterController.read);
route.get("/:id", RegisterController.readOne);
route.put("/update/:id", isAuthenticated, isAdmin, RegisterController.update);
route.delete("/delete/:id", isAuthenticated, isAdmin, RegisterController.delete);

export { route };
