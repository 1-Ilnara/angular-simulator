import { QuoteFilter } from '../enums/QuoteFilter';
import { IQuote } from './IQuote';

export interface IQuotesState {
  quotes: IQuote[];
  favorites: IQuote[];
  filter: QuoteFilter;
  randomQuote: IQuote | null;
}
