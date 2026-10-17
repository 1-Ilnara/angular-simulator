import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DoCheck, OnDestroy, inject } from '@angular/core';

@Component({
  selector: 'app-cd-default',
  imports: [],
  templateUrl: './cd-default.component.html',
  styleUrl: './cd-default.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CdDefaultComponent implements DoCheck, OnDestroy {
  count: number = 0;

  private http: HttpClient = inject(HttpClient);

  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngDoCheck(): void {
    console.warn('Change Detection');
  }

  ngOnDestroy(): void {
    this.stopInterval();
  }

  // Сценарий 1: click.
  // 1. Интерфейс обновился автоматически? Да.
  // 2. Сколько раз ngDoCheck()? 1.
  // 3. Нужен ChangeDetectorRef? Нет.
  // 4. Причина: DOM-событие click. Zone.js перехватил обработчик и после него
  //    Angular запустил Change Detection.
  changeCountClick(): void {
    this.count++;
  }

  // Сценарий 2: setTimeout.
  // 1. Да, обновился (с небольшой паузой).
  // 2. 2 раза: первый после клика по кнопке, второй после срабатывания таймера.
  // 3. Нет.
  // 4. Причина: Zone.js патчит setTimeout; после выполнения колбэка Angular
  //    запускает Change Detection.
  changeCountSetTimeout(): void {
    setTimeout(() => {
      this.count++;
    }, 1000);
  }

  // Сценарий 3: Promise.
  // 1. Да.
  // 2. 1 раз: микрозадача Promise выполняется сразу после обработчика клика,
  //    поэтому клик и Promise попадают в один цикл Change Detection.
  // 3. Нет.
  // 4. Причина: Zone.js патчит Promise; проверка запускается, когда
  //    очередь микрозадач опустела.
  changeCountPromise(): void {
    Promise.resolve().then(() => {
      this.count++;
    });
  }

  // Сценарий 4: HttpClient.
  // 1. Да, когда пришёл ответ (через пару сотен миллисекунд).
  // 2. Минимум 2: после клика и после получения ответа.
  // 3. Нет.
  // 4. Причина: Zone.js патчит XMLHttpRequest; завершение запроса запускает
  //    Change Detection.
  changeCountHttpClient(): void {
    this.http.get('https://jsonplaceholder.typicode.com/posts/1').subscribe(() => {
      this.count++;
    });
  }

  // Сценарий 5: setInterval (3 тика, потом останавливаем).
  // 1. Да, каждую секунду.
  // 2. 1 раз после клика + по 1 разу на каждый тик, всего 4.
  // 3. Нет.
  // 4. Причина: каждый вызов колбэка setInterval — отдельная задача Zone.js,
  //    после неё запускается Change Detection.
  changeCountSetInterval(): void {
    this.stopInterval();

    let ticks: number = 0;

    this.intervalId = setInterval(() => {
      this.count++;
      ticks++;

      if (ticks === 3) {
        this.stopInterval();
      }
    }, 1000);
  }

  // Сценарий 6: click + Promise + setTimeout одновременно (итог +3).
  // Click и Promise выполняются в одном цикле, setTimeout — в следующем.
  // ngDoCheck(): 2 раза (проверь по консоли, у тебя может получиться иначе).
  // Несколько изменений в одном цикле Angular объединяет в одну проверку.
  changeCountCombo(): void {
    this.count++;

    Promise.resolve().then(() => {
      this.count++;
    });

    setTimeout(() => {
      this.count++;
    }, 1000);
  }

  reset(): void {
    this.stopInterval();
    this.count = 0;
  }

  private stopInterval(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
