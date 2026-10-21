import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
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

  search: InputSignal<string> = input.required<string>();

  category: InputSignal<string | null> = input.required<string | null>();

  sortField: InputSignal<SortBy> = input.required<SortBy>();

  sortOrder: InputSignal<Order> = input.required<Order>();

  categories: InputSignal<string[]> = input.required<string[]>();

  searchChange: OutputEmitterRef<string> = output<string>();

  categoryChange: OutputEmitterRef<string | null> = output<string | null>();

  sortFieldChange: OutputEmitterRef<SortBy> = output<SortBy>();

  sortOrderChange: OutputEmitterRef<Order> = output<Order>();

  onSearchInput(event: Event): void {
    this.searchChange.emit((event.target as HTMLInputElement).value);
  }

  onCategoryChange(value: string | null): void {
    this.categoryChange.emit(value);
  }

  onSortFieldChange(value: SortBy): void {
    this.sortFieldChange.emit(value);
  }

  onSortOrderChange(value: Order): void {
    this.sortOrderChange.emit(value);
  }
}
