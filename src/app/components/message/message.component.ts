import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IMessage } from '../../../interfaces/IMessage';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  private messageService: MessageService = inject(MessageService);
  message$: Observable<IMessage | null> = this.messageService.message$;

  onClose(): void {
    this.messageService.clearMessage();
  }
  
}