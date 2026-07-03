import { Component, inject } from '@angular/core';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-users-page',
  standalone: true,
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {
  private messageService: MessageService = inject(MessageService);
  showUsersMessage(): void {
    this.messageService.showInfo('Страница пользователей открыта.');
  }
}