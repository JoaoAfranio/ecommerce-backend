import { Router } from "express";
import { updatePrices, validatePrices } from "../controllers/products-controller";
import multer from "multer";

const productsRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

productsRouter.post("/validate-prices", upload.single("csvFile"), validatePrices);
productsRouter.post("/update-prices", upload.single("csvFile"), updatePrices);

export { productsRouter };
