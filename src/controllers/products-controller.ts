import { Request, Response } from "express";
import csvtojson from "csvtojson";

export async function validatePrices(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).send("Nenhum arquivo CSV foi enviado.");
  }

  try {
    const csvData = req.file.buffer.toString();
    const csvJson = await csvtojson().fromString(csvData);

    res.status(200).send(csvJson);
  } catch (error) {
    console.error("Erro ao converter CSV para JSON:", error);
  }
}
