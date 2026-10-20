import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';
import { IProductQueryParams } from '../interfaces/IProductQueryParams';
import { IProductsResponse } from '../interfaces/IProductsResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private http: HttpClient = inject(HttpClient);

  private apiUrl: string = 'https://dummyjson.com/products';

  getProducts(params: IProductQueryParams): Observable<IProductsResponse> {
    return this.http.get<IProductsResponse>(this.apiUrl, { params: { ...params } });
  }

  searchProducts(query: string, params: IProductQueryParams): Observable<IProductsResponse> {
    return this.http.get<IProductsResponse>(`${this.apiUrl}/search`, {
      params: { q: query.trim(), ...params },
    });
  }

  getProductsByCategory(
    category: string,
    params: IProductQueryParams,
  ): Observable<IProductsResponse> {
    return this.http.get<IProductsResponse>(`${this.apiUrl}/category/${category}`, {
      params: { ...params },
    });
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/category-list`);
  }
}
