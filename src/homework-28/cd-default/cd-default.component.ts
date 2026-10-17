import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DoCheck, inject } from '@angular/core';

@Component({
  selector: 'app-cd-default',
  imports: [],
  templateUrl: './cd-default.component.html',
  styleUrl: './cd-default.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CdDefaultComponent implements DoCheck {
  count: number = 0;

  private http: HttpClient = inject(HttpClient);

  ngDoCheck(): void {
    console.warn('Change Detection');
  }

  // Сценарий 1: click.
  // Интерфейс обновился автоматически, ngDoCheck() 1 раз, ChangeDetectorRef не понадобился.
  // Причина: DOM-событие click, Zone.js запустил Change Detection.
  changeCountClick(): void {
    this.count++;
  }

  // Сценарий 2: setTimeout.
  // Значение изменилось с небольшой паузой, ngDoCheck() 2 раза (после клика и после таймера),
  // ChangeDetectorRef не понадобился.
  // Причина: Zone.js патчит setTimeout и запускает Change Detection после колбэка.
  changeCountSetTimeout(): void {
    setTimeout(() => {
      this.count++;
    }, 100);
  }

  // Сценарий 3: Promise.
  // Значение изменилось автоматически, ngDoCheck() 1 раз (клик и Promise в одном цикле),
  // ChangeDetectorRef не понадобился.
  // Причина: Zone.js патчит Promise, проверка запускается после микрозадачи.
  changeCountPromise(): void {
    Promise.resolve().then(() => {
      this.count++;
    });
  }

  // Сценарий 4: HttpClient.
  // Значение изменилось автоматически, когда пришёл ответ, ngDoCheck() 2 раза,
  // ChangeDetectorRef не понадобился.
  // Причина: Zone.js патчит XMLHttpRequest и запускает Change Detection после ответа.
  changeCountHttpClient(): void {
    this.http.get('https://jsonplaceholder.typicode.com/posts/1').subscribe(() => {
      this.count++;
    });
  }

  // Сценарий 5: setInterval.
  // Значение растёт каждую секунду автоматически, ngDoCheck() вызывается каждую секунду
  // (запиши, сколько раз за время теста), ChangeDetectorRef не понадобился.
  // Причина: каждый колбэк интервала — задача Zone.js, после неё идёт Change Detection.
  changeCountSetInterval(): void {
    setInterval(() => {
      this.count++;
    }, 1000);
  }

  // Сценарий 6: click + setTimeout + Promise одновременно.
  // count вырос на 3. Click и Promise попали в один цикл, setTimeout во второй,
  // ngDoCheck() сколько раз показала консоль (запиши своё число),
  // ChangeDetectorRef не понадобился.
  changeCountCombo(): void {
    this.count++;
    setTimeout(() => {
      this.count++;
    }, 100);
    Promise.resolve().then(() => {
      this.count++;
    });
  }
}
