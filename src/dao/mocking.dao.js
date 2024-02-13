import { randomUUID } from "node:crypto";
//import { } de moking service
import { faker } from '@faker-js/faker'

/*
export const generateMockingProducts = () => {
    return Array.from({ length: 100 }, (_, index) => ({
      title: `Mocked Product ${index + 1}`,
      description: 'Mocked Description',
      code: `M${index + 1}`,
      price: 10.0,
      status: true,
      stock: 10,
      category: 'Mocked Category',
      thumbnail: 'mocked-thumbnail-url'
    }));
};

*/


const mockProducts = []
for (let i = 0; i < 100; i++) {
  mockProducts.push({
    _id: { randomUUID },
    product: faker.commerce.product(),
    productAdjective: faker.commerce.productAdjective(),
    productMaterial: faker.commerce.productMaterial(),
    price: faker.commerce.price(),
  })
}
/*
const usersDaoMock = {
  readOne: async ({ email }) => {
    if (email === 'coderUser') {
      return mockUser
    }
    return Promise.reject(new Error('NOT FOUND'))
  },
  readMany: async ({ }) => {
    return mockUsers
  }
}*/

export class ProductDaoMocking {
    async getAllProductsMoking() {
        return await mockProducts.findMany().lean();
    }

    async getOneProductMoking(_id) {//getProductById
        return await mockProducts.findOne(_id).lean();
    }

    async deleteProductMocking(_id) {
        const deletedProduct = await mockProducts.findByIdAndDelete(id).lean();
        if (!deletedProduct) {
            throw new Error(`Producto no encontrado`);
        }
        return deletedProduct;
    }
}
