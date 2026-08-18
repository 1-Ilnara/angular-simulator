import { Pipe, PipeTransform } from '@angular/core';

export type PhoneFormatMode = 'compact' | 'international' | 'national' | 'masked';

@Pipe({
  name: 'phoneFormat',
  standalone: true
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string | null | undefined, mode: PhoneFormatMode = 'international'): string {
    if (!value) return '';

    const digits = value.replace(/\D/g, '');

    if (!digits) return '';

    const countryCode = digits.length > 10 ? digits.slice(0, digits.length - 10) : '';
    const mainNumber = digits.slice(-10); 

    const op = mainNumber.slice(0, 3);   
    const g1 = mainNumber.slice(3, 6);   
    const g2 = mainNumber.slice(6, 8);   
    const g3 = mainNumber.slice(8, 10);  

    switch (mode) {
      case 'compact':
        return `+${digits}`;

      case 'international':
        return `+${countryCode} ${op} ${g1} ${g2} ${g3}`.trim();

      case 'national':
        return `${op} ${g1} ${g2} ${g3}`;

      case 'masked':
        return `+${countryCode} ${op} *** ** ${g3}`.trim();

      default:
        return value;
    }
  }
  
}