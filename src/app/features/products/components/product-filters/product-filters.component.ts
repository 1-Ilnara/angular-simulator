import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProductService } from '../../data-access/product.service';
import { Order } from '../../enums/Order';
import { SortBy } from '../../enums/SortBy';
import { IOption } from '../../interfaces/IOption';

@Component({
  selector: 'app-product-filters',
  imports: [FormsModule, InputTextModule, SelectModule, SelectButtonModule],
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFiltersComponent {
  
  productService: ProductService = inject(ProductService);

  sortFieldOptions: IOption<SortBy>[] = [
    { label: 'Название', value: SortBy.TITLE },
    { label: 'Цена', value: SortBy.PRICE },
    { label: 'Рейтинг', value: SortBy.RATING },
    { label: 'Наличие', value: SortBy.STOCK },
  ];

  sortOrderOptions: IOption<Order>[] = [
    { label: 'По возрастанию', value: Order.ASC },
    { label: 'По убыванию', value: Order.DESC },
  ];

  onSearchInput(event: Event): void {
    this.productService.setSearch((event.target as HTMLInputElement).value);
  }

  onCategoryChange(value: string | null): void {
    this.productService.setCategory(value);
  }

  onSortFieldChange(value: SortBy): void {
    this.productService.setSortField(value);
  }

  onSortOrderChange(value: Order): void {
    this.productService.setSortOrder(value);
  }

}
