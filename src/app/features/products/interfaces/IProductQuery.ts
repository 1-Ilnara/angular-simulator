import { IProductQueryParams } from './IProductQueryParams';
export interface IProductQuery {
  search: string;
  category: string | null;
  params: IProductQueryParams;
}
