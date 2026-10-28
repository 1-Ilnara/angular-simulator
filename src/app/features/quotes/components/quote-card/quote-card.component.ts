import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IQuoteCard } from '../../interfaces/IQuoteCard';

@Component({
  selector: 'app-quote-card',
  imports: [CardModule, ButtonModule],
  templateUrl: './quote-card.component.html',
  styleUrl: './quote-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteCardComponent {

  quote: InputSignal<IQuoteCard> = input.required<IQuoteCard>();

  favoriteToggle: OutputEmitterRef<number> = output<number>();

  onFavoriteToggle(): void {
    this.favoriteToggle.emit(this.quote().id);
  }

}
