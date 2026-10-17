import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  OnDestroy,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-cd-on-push',
  imports: [],
  templateUrl: './cd-on-push.component.html',
  styleUrl: './cd-on-push.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdOnPushComponent implements DoCheck, OnDestroy {
  count: number = 0;

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngDoCheck(): void {
    console.warn('Change Detection (OnPush)');
  }

  ngOnDestroy(): void {
    this.stopInterval();
  }

  // Способы изменения count.
  // click обновляет интерфейс сам: событие внутри шаблона компонента помечает
  // его для проверки, поэтому markForCheck() здесь не нужен.
  // В setTimeout, setInterval и Promise вызван markForCheck(): без него count
  // менялся бы, а интерфейс оставался бы прежним (компонент OnPush не помечен,
  // и Angular его пропускает). Чтобы увидеть это самой, на минуту закомментируй
  // строку this.cdr.markForCheck() и нажми кнопку.
  changeCountClick(): void {
    this.count++;
  }

  changeCountSetTimeout(): void {
    setTimeout(() => {
      this.count++;
      this.cdr.markForCheck();
    }, 100);
  }

  changeCountSetInterval(): void {
    setInterval(() => {
      this.count++;
      this.cdr.markForCheck();
    }, 1000);
  }

  changeCountPromise(): void {
    Promise.resolve().then(() => {
      this.count++;
      this.cdr.markForCheck();
    });
  }

  // ЧАСТЬ 1. markForCheck()
  changeCountWithMarkForCheck(): void {
    setTimeout(() => {
      this.count++;
      this.cdr.markForCheck();
    }, 1000);
  }

  // 1. Что произошло после вызова markForCheck()?
  // Компонент и его предки помечены как "требуют проверки". Сама проверка
  // прямо сейчас не запускается.
  //
  // 2. Обновился ли интерфейс сразу?
  // Нет. DOM не обновляется в той же строке, где вызван markForCheck().
  //
  // 3. Когда фактически произошёл Change Detection?
  // На ближайшем цикле Change Detection: после завершения колбэка setTimeout
  // Zone.js запускает проверку, и компонент уже помечен, поэтому обновляется.
  //
  // 4. Почему без markForCheck() интерфейс не обновлялся?
  // OnPush пропускает компонент, если не изменился @Input и не было события
  // внутри шаблона. Колбэк setTimeout ни тем ни другим не является.

  // ЧАСТЬ 2. detectChanges()
  changeCountWithDetectChanges(): void {
    setTimeout(() => {
      this.count++;
      this.cdr.detectChanges();
    }, 1000);
  }

  // 1. Чем поведение отличается от markForCheck()?
  // detectChanges() запускает проверку немедленно и синхронно. markForCheck()
  // только помечает компонент, проверка произойдёт позже.
  //
  // 2. Выполняется ли Change Detection немедленно?
  // Да, прямо в момент вызова.
  //
  // 3. Какие компоненты были проверены?
  // Текущий компонент и его дочерние. Родители и соседи не проверяются.
  //
  // 4. В каких случаях detectChanges() предпочтительнее?
  // Когда DOM нужно обновить прямо сейчас (например, сразу измерить размеры
  // элемента); когда код работает вне Angular; после detach(), чтобы
  // обновить компонент вручную.

  // ЧАСТЬ 3. detach()
  detach(): void {
    this.cdr.detach();
  }

  // После detach() меняем count через click, setTimeout, setInterval, Promise.
  // 1. Обновляется ли интерфейс? Нет, ни одним способом. count меняется
  //    (это видно, если вывести его в консоль), а на странице остаётся старое
  //    число. Даже markForCheck() в таймерах не помогает: компонент отключён
  //    от дерева, и пометка ничего не меняет.
  // 2. Выполняется ли ngDoCheck()? Проверь по консоли. Мой ответ: да, он
  //    продолжает печататься, потому что ngDoCheck вызывает родитель при своей
  //    проверке, а detach() отключает только шаблон самого компонента.
  // 3. Почему Angular перестал проверять компонент? detach() убирает его вид
  //    из дерева Change Detection, и Angular не заходит в его шаблон.
  // 4. Какие способы не работают? Все: click, setTimeout, setInterval, Promise
  //    (в том числе с markForCheck()).

  // ЧАСТЬ 4. reattach()
  reattach(): void {
    this.cdr.reattach();
  }

  // 1. Что изменилось после reattach()? Компонент снова включён в дерево
  //    Change Detection, и накопившееся значение count появляется на странице.
  // 2. Когда он снова начал участвовать? Со следующего цикла Change Detection
  //    после вызова reattach() (кнопка reattach сама запускает такой цикл,
  //    потому что это клик).
  // 3. Нужно ли дополнительно вызывать detectChanges() или markForCheck()?
  //    Для стратегии OnPush да: reattach() только возвращает компонент в дерево,
  //    но сам его для проверки не помечает. Поэтому значения, изменённые
  //    асинхронно (setTimeout, setInterval, Promise), показываются через
  //    markForCheck() (как в этих методах) или detectChanges().

  private stopInterval(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
