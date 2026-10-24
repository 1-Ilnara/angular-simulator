import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../data-access/cart.service';
import { IProduct } from '../../interfaces/IProduct';

@Component({
  selector: 'app-product-detail-page',
  imports: [CurrencyPipe, RouterLink, ButtonModule],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailPageComponent {
  
  private route: ActivatedRoute = inject(ActivatedRoute);

  product: IProduct = this.route.snapshot.data['product'] as IProduct;

  cartService: CartService = inject(CartService);

  selectedImage: WritableSignal<string> = signal<string>(
    this.product.images[0] ?? this.product.thumbnail,
  );

  onAddToCart(): void {
    this.cartService.add(this.product);
  }

  onSelectImage(image: string): void {
    this.selectedImage.set(image);
  }
}
