import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../interfaces/IUser';
import { UpperCasePipe } from '@angular/common'; // Встроенный пайп
import { PhoneFormatPipe } from '../../pipes/phone-format.pipe/phone-format.pipe.component'; // (или путь к вашему файлу телефона)
import { HoverBoldDirective } from '../../directives/hover-bold.directive/hover-bold.directive.component';
import { AnimatedGradientDirective } from '../../directives/animated-gradient.directive/animated-gradient.directive.component';



@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, PhoneFormatPipe, HoverBoldDirective, AnimatedGradientDirective],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  onDelete(): void {
    this.deleteUser.emit(this.user.id);
  }

}