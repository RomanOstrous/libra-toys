import { Product } from '../types/ProductType';
import { client } from './httpClient';

export const getProduct = async () => {
  try {
    const response = await client.get<Product[]>('shop/products/');
    return response;
  } catch (error) {
    console.error('Помилка загрузки продуктів', error);
    throw error;
  }
};
