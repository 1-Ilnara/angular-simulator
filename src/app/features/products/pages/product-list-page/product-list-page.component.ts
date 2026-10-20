import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductFiltersComponent } from '../../components/product-filters/product-filters.component';
import { CartService } from '../../data-access/cart.service';
import { ProductService } from '../../data-access/product.service';
import { IProduct } from '../../interfaces/IProduct';

@Component({
  selector: 'app-product-list-page',
  imports: [ProductCardComponent, ProductFiltersComponent, Paginator, RouterLink, SkeletonModule],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListPageComponent {
  protected productService: ProductService = inject(ProductService);

  protected cartService: CartService = inject(CartService);

  private router: Router = inject(Router);

  protected rowsPerPageOptions: number[] = [10, 20, 30];

  protected pageReportTemplate: string =
    'Страница {currentPage} из {totalPages}, всего товаров: {totalRecords}';

  protected skeletonItems: Signal<number[]> = computed((): number[] =>
    Array.from(
      { length: this.productService.pageSize() },
      (_: unknown, index: number): number => index,
    ),
  );

  protected onAddToCart(product: IProduct): void {
    this.cartService.add(product);
  }

  protected onOpen(product: IProduct): void {
    void this.router.navigate(['/products', product.id]);
  }

  protected onPageChange(event: PaginatorState): void {
    const rows: number = event.rows ?? this.productService.pageSize();

    if (rows !== this.productService.pageSize()) {
      this.productService.setPageSize(rows);

      return;
    }

    this.productService.setPage((event.page ?? 0) + 1);
  }
}
