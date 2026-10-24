import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { ICartItem } from '../interfaces/ICartItem';
import { ICartProduct } from '../interfaces/ICartProduct';
import { ICartProductPayload } from '../interfaces/ICartProductPayload';
import { ICartResponse } from '../interfaces/ICartResponse';
import { ICartsResponse } from '../interfaces/ICartsResponse';
import { IProduct } from '../interfaces/IProduct';
import { CartApiService } from './cart-api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartApi: CartApiService = inject(CartApiService);

  private userId: number = 1;

  private taxRate: number = 0.2;

  private cartId: number | null = null;

  private _items: WritableSignal<ICartItem[]> = signal<ICartItem[]>([]);

  items: Signal<ICartItem[]> = this._items.asReadonly();

  itemsCount: Signal<number> = computed((): number =>
    this._items().reduce((sum: number, item: ICartItem): number => sum + item.quantity, 0),
  );

  subtotal: Signal<number> = computed((): number =>
    this.roundMoney(
      this._items().reduce(
        (sum: number, item: ICartItem): number => sum + item.price * item.quantity,
        0,
      ),
    ),
  );

  tax: Signal<number> = computed((): number => this.roundMoney(this.subtotal() * this.taxRate));

  total: Signal<number> = computed((): number => this.roundMoney(this.subtotal() + this.tax()));

  constructor() {
    this.loadUserCart();
  }

  add(product: IProduct): void {
    const existing: ICartItem | undefined = this._items().find(
      (item: ICartItem): boolean => item.id === product.id,
    );

    if (existing) {
      this.setQuantity(existing.id, existing.quantity + 1);

      return;
    }

    this.updateItems([...this._items(), this.mapProductToCartItem(product)]);
  }

  setQuantity(id: number, quantity: number): void {
    if (quantity <= 0) {
      this.remove(id);

      return;
    }

    const next: ICartItem[] = this._items().map((item: ICartItem): ICartItem =>
      item.id === id ? { ...item, quantity } : item,
    );

    this.updateItems(next);
  }

  remove(id: number): void {
    const next: ICartItem[] = this._items().filter((item: ICartItem): boolean => item.id !== id);

    this.updateItems(next);
  }

  clear(): void {
    const cartId: number | null = this.cartId;

    this._items.set([]);
    this.cartId = null;

    if (cartId === null) {
      return;
    }

    this.cartApi
      .deleteCart(cartId)
      .pipe(catchError((): Observable<never> => EMPTY))
      .subscribe();
  }

  private loadUserCart(): void {
    this.cartApi
      .getUserCarts(this.userId)
      .pipe(
        tap(({ carts }: ICartsResponse): void => {
          const cart: ICartResponse | undefined = carts[0];

          this.cartId = cart?.id ?? null;
          const products: ICartProduct[] = cart?.products ?? [];

          this._items.set(products);
        }),
        catchError((): Observable<never> => EMPTY),
      )
      .subscribe();
  }

  private updateItems(next: ICartItem[]): void {
    this._items.set(next);

    this.saveCart(next)
      .pipe(catchError((): Observable<never> => EMPTY))
      .subscribe();
  }

  private saveCart(items: ICartItem[]): Observable<ICartResponse> {
    const products: ICartProductPayload[] = items.map(
      ({ id, quantity }: ICartItem): ICartProductPayload => ({ id, quantity }),
    );

    if (this.cartId === null) {
      return this.cartApi.addCart(this.userId, products).pipe(
        tap((cart: ICartResponse): void => {
          this.cartId = cart.id;
        }),
      );
    }

    return this.cartApi.updateCart(this.cartId, products);
  }

  private mapProductToCartItem({ id, title, price, thumbnail }: IProduct): ICartItem {
    return { id, title, price, thumbnail, quantity: 1 };
  }

  private roundMoney(value: number): number {
    return Math.round(value * 100) / 100;
  }
  
}
