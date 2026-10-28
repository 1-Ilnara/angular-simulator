import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { QuoteCardComponent } from '../../components/quote-card/quote-card.component';
import { QuoteFilter } from '../../enums/QuoteFilter';
import { QuotesStore } from '../../store/quotes.store';

interface IFilterOption {
  label: string;
  value: QuoteFilter;
}

@Component({
  selector: 'app-quotes-page',
  imports: [FormsModule, ButtonModule, SelectButtonModule, QuoteCardComponent],
  providers: [QuotesStore],
  templateUrl: './quotes-page.component.html',
  styleUrl: './quotes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotesPageComponent implements OnInit {
  quotesStore: InstanceType<typeof QuotesStore> = inject(QuotesStore);

  filterOptions: IFilterOption[] = [
    { label: 'Все', value: QuoteFilter.ALL },
    { label: 'Избранное', value: QuoteFilter.FAVORITES },
  ];

  ngOnInit(): void {
    this.quotesStore.loadQuotes();
  }

  onFilterChange(event: SelectButtonChangeEvent): void {
    if (event.value) {
      this.quotesStore.setFilter(event.value as QuoteFilter);
    }
  }

  onFavoriteToggle(id: number): void {
    this.quotesStore.toggleFavorite(id);
  }

  onRandomQuote(): void {
    this.quotesStore.pickRandomQuote();
  }

  onRetry(): void {
    this.quotesStore.loadQuotes();
  }
}
