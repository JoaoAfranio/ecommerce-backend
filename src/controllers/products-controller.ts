import { Request, Response } from "express";
import csvtojson from "csvtojson";
import productService from "../services/products-service";

export async function validatePrices(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).send("Nenhum arquivo CSV foi enviado.");
  }

  try {
    const csvData = req.file.buffer.toString();
    const csvJson = await csvtojson().fromString(csvData);

    const result = await productService.updateProductPrices(csvJson);

    res.status(200).send(result);
  } catch (error) {
    console.error("Erro ao validar CSV", error);
  }
}
