import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../data-access/cart.service';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink, CurrencyPipe, ButtonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPageComponent {
  protected readonly cartService: CartService = inject(CartService);

  protected onDecrease(id: number, quantity: number): void {
    this.cartService.setQuantity(id, quantity - 1);
  }

  protected onIncrease(id: number, quantity: number): void {
    this.cartService.setQuantity(id, quantity + 1);
  }

  protected onRemove(id: number): void {
    this.cartService.remove(id);
  }

  protected onClear(): void {
    this.cartService.clear();
  }
}
