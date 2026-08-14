import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-style-test-one',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <div class="test-container">
      <h3>Тест 1: Переопределение через :host ::ng-deep</h3>
      <p-button label="Кастомная фиолетовая кнопка"></p-button>
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      .p-button {
        background-color: #6b21a8 !important;
        border-color: #581c87 !important;
        border-radius: 20px !important;
        font-weight: bold;
      }
    }
  `]
})
export class StyleTestOneComponent {}