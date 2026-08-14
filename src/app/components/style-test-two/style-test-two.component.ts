import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-style-test-two',
  standalone: true,
  imports: [ButtonModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="test-container">
      <h3>Тест 2: Переопределение через ViewEncapsulation.None</h3>
      <p-button label="Кастомная зеленая кнопка"></p-button>
    </div>
  `,
  styles: [`
    app-style-test-two .p-button {
      background-color: #15803d !important;
      border-color: #166534 !important;
      color: #ffffff !important;
    }
  `]
})
export class StyleTestTwoComponent {}