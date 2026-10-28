import { computed, inject, Signal } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, Observable, pipe, switchMap, tap } from 'rxjs';
import { withRequestStatus } from '../../../shared/store/with-request-status.feature';
import { QuoteApiService } from '../data-access/quote-api.service';
import { QuoteFilter } from '../enums/QuoteFilter';
import { IQuote } from '../interfaces/IQuote';
import { IQuoteCard } from '../interfaces/IQuoteCard';
import { IQuotesResponse } from '../interfaces/IQuotesResponse';
import { IQuotesState } from '../interfaces/IQuotesState';

const initialQuotesState: IQuotesState = {
  quotes: [],
  favorites: [],
  filter: QuoteFilter.ALL,
  randomQuote: null,
};

export const QuotesStore = signalStore(
  withState<IQuotesState>(initialQuotesState),
  withRequestStatus(),
  withComputed(({ quotes, favorites, filter }) => {
    const favoriteIds: Signal<Set<number>> = computed(
      (): Set<number> => new Set(favorites().map((item: IQuote): number => item.id)),
    );

    return {
      favoritesCount: computed((): number => favorites().length),

      authorsCount: computed(
        (): number => new Set(quotes().map((item: IQuote): string => item.author)).size,
      ),

      visibleQuotes: computed((): IQuoteCard[] => {
        const source: IQuote[] = filter() === QuoteFilter.FAVORITES ? favorites() : quotes();

        return source.map((item: IQuote): IQuoteCard => ({
          ...item,
          isFavorite: favoriteIds().has(item.id),
        }));
      }),
    };
  }),
  withMethods((store, quoteApiService: QuoteApiService = inject(QuoteApiService)) => ({
    loadQuotes: rxMethod<void>(
      pipe(
        tap((): void => store.startRequest()),
        switchMap((): Observable<IQuotesResponse> =>
          quoteApiService.getQuotes().pipe(
            tap((response: IQuotesResponse): void => {
              patchState(store, { quotes: response.quotes });
              store.finishRequest();
            }),
            catchError((): Observable<never> => {
              store.failRequest('Не удалось загрузить цитаты');

              return EMPTY;
            }),
          ),
        ),
      ),
    ),

    setFilter(filter: QuoteFilter): void {
      patchState(store, { filter });
    },

    toggleFavorite(id: number): void {
      const isFavorite: boolean = store.favorites().some((item: IQuote): boolean => item.id === id);

      if (isFavorite) {
        patchState(store, {
          favorites: store.favorites().filter((item: IQuote): boolean => item.id !== id),
        });

        return;
      }

      const quote: IQuote | undefined = store
        .quotes()
        .find((item: IQuote): boolean => item.id === id);

      if (quote) {
        patchState(store, { favorites: [...store.favorites(), quote] });
      }
    },

    pickRandomQuote(): void {
      const quotes: IQuote[] = store.quotes();

      if (quotes.length === 0) {
        return;
      }

      const index: number = Math.floor(Math.random() * quotes.length);

      patchState(store, { randomQuote: quotes[index] ?? null });
    },
  })),
);
