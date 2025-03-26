import productData from '~/shared/products.json';
import type {Product} from "~/types/product";

export class ProductService {
    private products: Product[] = productData;

    async getProducts(): Promise<Product[] | Error> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const products = this.products
                if (products) {
                    resolve(products);
                } else {
                    const err = new Error('Неверный логин или пароль')
                    reject(err)
                }
            }, 200);
        });
    }
}