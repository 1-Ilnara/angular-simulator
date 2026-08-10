import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../interfaces/IUser';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
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