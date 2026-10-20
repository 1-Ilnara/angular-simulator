import { IProductQueryParams } from './IProductQueryParams';

// Полный запрос списка: поиск + категория + страница + сортировка.
export interface IProductQuery {
  search: string;
  category: string | null;
  params: IProductQueryParams;
}
