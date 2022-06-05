import { Router } from "express";
import EquipmentsController from "../controllers/Equipments.controller";
import { isAdmin } from "../middlewares/isAdmin";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const route = Router();

route.post("/create", isAuthenticated, isAdmin, EquipmentsController.create);
route.get("/", EquipmentsController.read);
route.get("/:id", EquipmentsController.readOne);
route.delete("/delete/:id", EquipmentsController.delete);
route.put('/update/:id', isAuthenticated, isAdmin, EquipmentsController.update);

export { route };
