import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IProduct } from '../../interfaces/IProduct';

/** Карточка продукта. Данные получает через input, действия отдаёт через output. */
@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, CardModule, ButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product: InputSignal<IProduct> = input.required<IProduct>();

  addToCart: OutputEmitterRef<IProduct> = output<IProduct>();

  open: OutputEmitterRef<IProduct> = output<IProduct>();

  protected onOpen(): void {
    this.open.emit(this.product());
  }

  protected onAddToCart(event: MouseEvent): void {
    // Клик по кнопке не должен открывать страницу продукта.
    event.stopPropagation();
    this.addToCart.emit(this.product());
  }
}
