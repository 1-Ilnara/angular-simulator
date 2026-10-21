import { ICartProduct } from './ICartProduct';
export interface ICartResponse {
  id: number;
  products: ICartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}
