import { Packs } from "@prisma/client";
import productRepository from "../repositories/product-repository";

async function updateProductPrices(listUpdateProducts: UpdateProductPriceParams[]) {
  const res = await validateProductList(listUpdateProducts);

  return res;
}

async function validateProductList(listUpdateProducts: UpdateProductPriceParams[]) {
  const validationPromises = listUpdateProducts.map(async (product) => {
    const error_validations: ErrorValidations = {
      products_exists: true,
      price_correct_format: true,
      sales_lower_than_cost: true,
      price_adjustment_perc: true,
      pack_products_adjustment: true,
    };

    const prod = await productExists(product);
    if (!prod) {
      return { ...product, error_validations };
    }
    error_validations.products_exists = false;

    const priceValidation = await priceNumberIsValid(Number(product.new_price));
    if (!priceValidation) {
      return { prod, error_validations };
    }
    error_validations.price_correct_format = false;

    const adjustmentValid = await adjustmentIsValid(Number(prod.cost_price), Number(product.new_price));
    if (adjustmentValid) {
      error_validations.sales_lower_than_cost = false;
    }

    const percentageValid = await percAdjustmentIsValid(Number(prod.sales_price), Number(product.new_price));
    if (percentageValid) {
      error_validations.price_adjustment_perc = false;
    }

    if (prod.Pack.length > 0) {
      const validationPack = await validatePackPrice(prod.Pack, listUpdateProducts, Number(product.new_price));

      if (validationPack) error_validations.pack_products_adjustment = false;
    } else {
      error_validations.pack_products_adjustment = false;
    }

    return {
      code: Number(prod.code),
      name: prod.name,
      cost_price: Number(prod.cost_price),
      sales_price: Number(prod.sales_price),
      new_price: Number(product.new_price),
      error_validations,
    };
  });

  const validatedProducts = await Promise.all(validationPromises);

  return validatedProducts;
}

async function productExists(product: UpdateProductPriceParams) {
  if (!product.product_code) return false;

  const prod = await productRepository.findProductByCode(Number(product.product_code));

  if (!prod) {
    return false;
  }

  return prod;
}

async function priceNumberIsValid(price_number: number) {
  if (isNaN(price_number) || price_number <= 0) return false;

  return true;
}

async function adjustmentIsValid(cost_price: number, new_price: number) {
  if (cost_price > new_price) return false;
  return true;
}

async function percAdjustmentIsValid(sales_price: number, new_price: number) {
  const perc = (sales_price * 10) / 100;
  const differenceBetweenPrices = Math.abs(new_price - sales_price);

  if (differenceBetweenPrices > perc) return false;

  return true;
}

async function validatePackPrice(packs: Packs[], listUpdateProducts: UpdateProductPriceParams[], new_price_pack: number) {
  const listProducts = new Map(listUpdateProducts.map((product) => [BigInt(product.product_code), Number(product.new_price)]));
  const hasAllProductsInList = packs.every((pack) => listProducts.has(pack.product_id));

  if (!hasAllProductsInList) return false;

  const totalValue = packs.reduce((total, pack) => {
    const price = Number(listProducts.get(pack.product_id));
    return (total += price * Number(pack.qty));
  }, 0);

  if (new_price_pack !== totalValue) return false;

  return true;
}

type UpdateProductPriceParams = {
  product_code: string;
  new_price: string;
};

type ErrorValidations = {
  products_exists: boolean;
  price_correct_format: boolean;
  sales_lower_than_cost: boolean;
  price_adjustment_perc: boolean;
  pack_products_adjustment: boolean;
};

const productService = {
  updateProductPrices,
};

export default productService;
