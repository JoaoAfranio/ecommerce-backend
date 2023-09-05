import { Router } from "express";
import { validatePrices } from "../controllers/products-controller";

const productsRouter = Router();

productsRouter.post("/update-prices", validatePrices);

export { productsRouter };
