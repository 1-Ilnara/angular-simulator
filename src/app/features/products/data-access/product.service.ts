import {
  computed,
  inject,
  Injectable,
  linkedSignal,
  ResourceRef,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { catchError, Observable, of, switchMap, timer } from 'rxjs';
import { Order } from '../enums/Order';
import { SortBy } from '../enums/SortBy';
import { IProduct } from '../interfaces/IProduct';
import { IProductQuery } from '../interfaces/IProductQuery';
import { IProductsResponse } from '../interfaces/IProductsResponse';
import { ProductApiService } from './product-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productApi: ProductApiService = inject(ProductApiService);

  private searchDebounceMs: number = 300;

  private emptyResponse: IProductsResponse = {
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
  };

  private _search: WritableSignal<string> = signal<string>('');

  private _selectedCategory: WritableSignal<string | null> = signal<string | null>(null);

  private _pageSize: WritableSignal<number> = signal<number>(10);

  private _sortField: WritableSignal<SortBy> = signal<SortBy>(SortBy.TITLE);

  private _sortOrder: WritableSignal<Order> = signal<Order>(Order.ASC);

  private readonly _page: WritableSignal<number> = linkedSignal<unknown, number>({
    source: (): unknown => ({
      search: this._search(),
      category: this._selectedCategory(),
      pageSize: this._pageSize(),
      sortField: this._sortField(),
      sortOrder: this._sortOrder(),
    }),
    computation: (): number => 1,
  });

  search: Signal<string> = this._search.asReadonly();

  selectedCategory: Signal<string | null> = this._selectedCategory.asReadonly();

  page: Signal<number> = this._page.asReadonly();

  pageSize: Signal<number> = this._pageSize.asReadonly();

  sortField: Signal<SortBy> = this._sortField.asReadonly();

  sortOrder: Signal<Order> = this._sortOrder.asReadonly();

  skip: Signal<number> = computed((): number => (this.page() - 1) * this.pageSize());

  private readonly query: Signal<IProductQuery> = computed((): IProductQuery => ({
    search: this._search(),
    category: this._selectedCategory(),
    params: {
      limit: this.pageSize(),
      skip: this.skip(),
      sortBy: this._sortField(),
      order: this._sortOrder(),
    },
  }));

  private readonly productsResource: ResourceRef<IProductsResponse> = rxResource({
    params: (): IProductQuery => this.query(),
    stream: ({ params }): Observable<IProductsResponse> => {
      const request$: Observable<IProductsResponse> = this.loadProducts(params);

      if (params.search) {
        return timer(this.searchDebounceMs).pipe(
          switchMap((): Observable<IProductsResponse> => request$),
          catchError((): Observable<IProductsResponse> => of(this.emptyResponse)),
        );
      }

      return request$.pipe(catchError((): Observable<IProductsResponse> => of(this.emptyResponse)));
    },
    defaultValue: this.emptyResponse,
  });

  readonly products: Signal<IProduct[]> = computed(
    (): IProduct[] => this.productsResource.value().products,
  );

  total: Signal<number> = linkedSignal<{ loading: boolean; total: number }, number>({
    source: (): { loading: boolean; total: number } => ({
      loading: this.productsResource.isLoading(),
      total: this.productsResource.value().total,
    }),
    computation: (
      source: { loading: boolean; total: number },
      previous?: { value: number },
    ): number => (source.loading && previous ? previous.value : source.total),
  });

  loading: Signal<boolean> = this.productsResource.isLoading;

  categories: Signal<string[]> = toSignal(
    this.productApi.getCategories().pipe(catchError((): Observable<string[]> => of([]))),
    { initialValue: [] },
  );

  setSearch(value: string): void {
    this._search.set(value);

    if (value) {
      this._selectedCategory.set(null);
    }
  }

  setCategory(value: string | null): void {
    this._selectedCategory.set(value);
    this._search.set('');
  }

  setSortField(value: SortBy): void {
    this._sortField.set(value);
  }

  setSortOrder(value: Order): void {
    this._sortOrder.set(value);
  }

  setPageSize(value: number): void {
    this._pageSize.set(value);
  }

  setPage(value: number): void {
    this._page.set(value);
  }

  private loadProducts({ search, category, params }: IProductQuery): Observable<IProductsResponse> {
    if (search) {
      return this.productApi.searchProducts(search, params);
    }

    if (category) {
      return this.productApi.getProductsByCategory(category, params);
    }

    return this.productApi.getProducts(params);
  }
}
