import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { IUser } from '../../../../core/interfaces/IUser';
import { PhoneFormatPipe } from '../../../../shared/pipes/phone-format.pipe';
import { HoverBoldDirective } from '../../../../shared/directives/hover-bold.directive';
import { AnimatedGradientDirective } from '../../../../shared/directives/animated-gradient.directive';
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    CommonModule,
    UpperCasePipe,
    PhoneFormatPipe,
    HoverBoldDirective,
    AnimatedGradientDirective,
  ],
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
