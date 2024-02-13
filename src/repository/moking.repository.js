import { ProductDaoMocking } from '../dao/mocking.dao.js';

const productDaoMock = new ProductDaoMocking();

export class ProductMokingRepository {
    async getAllProductsMoking() {
        return await productDaoMock.getAllProductsMoking();
    }

    async getOneProductMoking(_id) {
        return await productDaoMock.getOneProductMoking(_id);
    }

    async deleteProductMocking(_id) {
        return await productDaoMock.deleteProductMocking(_id);
    }
}