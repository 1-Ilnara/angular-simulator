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
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  protected readonly product: IProduct = this.route.snapshot.data['product'] as IProduct;

  protected readonly cartService: CartService = inject(CartService);

  protected readonly selectedImage: WritableSignal<string> = signal<string>(
    this.product.images[0] ?? this.product.thumbnail,
  );

  protected onAddToCart(): void {
    this.cartService.add(this.product);
  }

  protected onSelectImage(image: string): void {
    this.selectedImage.set(image);
  }
}
