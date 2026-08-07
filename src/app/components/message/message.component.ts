import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  private messageService = inject(MessageService);

  messages$ = this.messageService.messages$;

  onClose(): void {
    this.messageService.closeMessage();
  }

}
