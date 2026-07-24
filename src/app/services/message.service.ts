import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMessage } from '../../interfaces/IMessage';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private readonly messageSubject = new BehaviorSubject<IMessage | null>(null);

  public readonly message$: Observable<IMessage | null> = this.messageSubject.asObservable();

  showMessage(message: IMessage): void {
    this.messageSubject.next(message);
  }

  clearMessage(): void {
    this.messageSubject.next(null);
  }
  
}
