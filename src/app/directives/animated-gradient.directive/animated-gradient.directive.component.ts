import { Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2, inject } from '@angular/core';

export interface GradientConfiguration {
  delay?: number;
  colors?: string[];
  thickness?: string;
}

@Directive({
  selector: '[appAnimatedGradient]',
  standalone: true
})
export class AnimatedGradientDirective implements OnDestroy {

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  // Разрешаем принимать пустую строку или undefined при вызове атрибута без значений
  @Input('appAnimatedGradient') config?: GradientConfiguration | '' | undefined;

  private timerId: ReturnType<typeof setTimeout> | null = null;
  private isEffectActive = false;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    // Безопасно извлекаем задержку
    const delay = (typeof this.config === 'object' && this.config?.delay) ? this.config.delay : 1000;

    this.timerId = setTimeout(() => {
      this.applyGradient();
      this.isEffectActive = true;
    }, delay);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.clearTimer();
    if (this.isEffectActive) {
      this.removeGradient();
      this.isEffectActive = false;
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private applyGradient(): void {
    const configObj = typeof this.config === 'object' ? this.config : undefined;
    const colors = configObj?.colors ?? ['#ff007f', '#7f00ff', '#00f0ff'];
    const thickness = configObj?.thickness ?? '2px';

    this.renderer.setStyle(this.el.nativeElement, 'border', `${thickness} solid transparent`);
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-image',
      `linear-gradient(white, white), linear-gradient(90deg, ${colors.join(', ')})`
    );
    this.renderer.setStyle(this.el.nativeElement, 'background-origin', 'border-box');
    this.renderer.setStyle(this.el.nativeElement, 'background-clip', 'padding-box, border-box');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease');
  }

  private removeGradient(): void {
    this.renderer.removeStyle(this.el.nativeElement, 'border');
    this.renderer.removeStyle(this.el.nativeElement, 'background-image');
    this.renderer.removeStyle(this.el.nativeElement, 'background-origin');
    this.renderer.removeStyle(this.el.nativeElement, 'background-clip');
    this.renderer.removeStyle(this.el.nativeElement, 'transition');
  }

  private clearTimer(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
  
}