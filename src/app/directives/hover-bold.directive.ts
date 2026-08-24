import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appHoverBold]',
  standalone: true,
})
export class HoverBoldDirective {

  private el: ElementRef<HTMLElement> = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.removeStyle(this.el.nativeElement, 'font-weight');
  }
  
}