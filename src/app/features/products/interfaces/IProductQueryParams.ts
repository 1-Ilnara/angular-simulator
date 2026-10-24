import { Order } from '../enums/Order';
import { SortBy } from '../enums/SortBy';
export interface IProductQueryParams {
  limit: number;
  skip: number;
  sortBy: SortBy;
  order: Order;
}
