import { prisma } from "../config";

async function findProductByCode(code: number) {
  return prisma.products.findFirst({
    where: {
      code,
    },
    include: {
      Pack: true,
    },
  });
}

async function updateProductPrice(code: number, sales_price: number) {
  return prisma.products.update({
    where: {
      code,
    },
    data: {
      sales_price,
    },
  });
}

const productRepository = {
  findProductByCode,
  updateProductPrice,
};

export default productRepository;
