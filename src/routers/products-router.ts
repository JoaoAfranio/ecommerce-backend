import { Router } from "express";
import { validatePrices } from "../controllers/products-controller";
import multer from "multer";

const productsRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

productsRouter.post("/update-prices", upload.single("csvFile"), validatePrices);

export { productsRouter };
