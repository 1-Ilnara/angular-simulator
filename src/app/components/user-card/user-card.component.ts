import { Component,Input,Output,EventEmitter,ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { IUser } from '../../../interfaces/IUser';
import { PhoneFormatPipe } from '../../pipes/phone-format.pipe/phone-format.pipe.component';
import { HoverBoldDirective } from '../../directives/hover-bold.directive/hover-bold.directive.component';
import { AnimatedGradientDirective } from '../../directives/animated-gradient.directive/animated-gradient.directive.component';

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
  @Input({ required: true }) public user!: IUser;
  @Output() public deleteUser: EventEmitter<number> = new EventEmitter<number>();

  onDelete(): void {
    this.deleteUser.emit(this.user.id);
  }
}