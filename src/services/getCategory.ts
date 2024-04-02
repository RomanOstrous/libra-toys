import { CategoryType } from '../types/categoryType';
import { client } from './httpClient';

export const getCategories = async () => {
  try {
    const response = await client.get<CategoryType[]>('shop/categories/');
    return response;
  } catch (error) {
    console.error('Помилка загрузки продуктів', error);
    throw error;
  }
};