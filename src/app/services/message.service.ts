import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMessage } from '../../interfaces/IMessage';
import { APP_CONFIG } from '../tokens/app-config.token';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private config = inject(APP_CONFIG);

  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();

  setMessage(message: IMessage): void {
    if (!this.config.enableNotifications) {
      return;
    }
    const currentMessages = this.messagesSubject.getValue();
    this.messagesSubject.next([...currentMessages, message]);
  }

  closeMessage(): void {
    this.messagesSubject.next([]);
  }
}
