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

const productRepository = {
  findProductByCode,
};

export default productRepository;
