import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
  standalone: true,
})
export class PluralPipe implements PipeTransform {
  
  transform(
    value: number | string,
    one: string,
    few: string,
    many: string
  ): string {
    const num: number = Math.abs(
      typeof value === 'string' ? parseInt(value, 10) : value
    );

    if (isNaN(num)) {
      return `${value} ${many}`;
    }

    const mod100: number = num % 100;
    const mod10: number = num % 10;

    let word: string = many;

    if (mod100 < 11 || mod100 > 19) {
      if (mod10 === 1) {
        word = one;
      } else if (mod10 >= 2 && mod10 <= 4) {
        word = few;
      }
    }

    return `${num} ${word}`;
  }

}