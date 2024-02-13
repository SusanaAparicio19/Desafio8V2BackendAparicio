import { ProductMokingService } from '../services/mocking.service.js';


const productServiceMock = new ProductMokingService();

export async function getAllProductsMoking(req, res) {
        
    try {
        const prd = await productServiceMock.getAllProductsMoking();
        res.successfullGet(prd);
    } catch (error) {
        res.serverError(`Error al recibir el producto `);
    }
}

export async function getOneProductMoking(req, res) {
    const id = parseInt(req.params.id);    
    try {
        const prdId = await productServiceMock.getOneProductMoking(id);
        res.successfullGet(prdId);
    } catch (error) {
         res.serverError(`Error al recibir el producto con Id ${id}`);
    }
}

export async function deleteProductMocking(req, res) {
    const id = parseInt(req.params.id);    
    try {
        await productServiceMock.deleteProductMocking(id);
        res.deleted();
    } catch (error) {
        res.serverError(`Error al eliminar el producto con Id ${id}`);
    }
}

/*
export const mockingProducts = (req, res) => {
  const mockingProducts = mockProducts();
  res.json(mockingProducts);
}*/