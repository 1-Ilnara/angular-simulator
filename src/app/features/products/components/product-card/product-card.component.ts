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

  onOpen(): void {
    this.open.emit(this.product());
  }

  onAddToCart(event: MouseEvent): void {
    event.stopPropagation();
    this.addToCart.emit(this.product());
  }
  
}
