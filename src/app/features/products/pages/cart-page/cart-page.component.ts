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
  
  cartService: CartService = inject(CartService);

  onDecrease(id: number, quantity: number): void {
    this.cartService.setQuantity(id, quantity - 1);
  }

  onIncrease(id: number, quantity: number): void {
    this.cartService.setQuantity(id, quantity + 1);
  }

  onRemove(id: number): void {
    this.cartService.remove(id);
  }

  onClear(): void {
    this.cartService.clear();
  }
}
