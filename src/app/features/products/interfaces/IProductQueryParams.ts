import { Order } from '../enums/Order';
import { SortBy } from '../enums/SortBy';

// Параметры, которые поддерживает API: страница и сортировка.
export interface IProductQueryParams {
  limit: number;
  skip: number;
  sortBy: SortBy;
  order: Order;
}
