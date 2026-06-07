import { Injectable } from '@angular/core';
import { IMessage } from '../../interfaces/IMessage';
import { MessageType } from '../../enums/MessageType';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: IMessage[] = [];

  private nextId: number = 1;

  addMessage(text: string, type: MessageType): void {
    const titles: Record<MessageType, string> = {
      [MessageType.SUCCESS]: 'Success',
      [MessageType.INFO]: 'Info',
      [MessageType.WARNING]: 'Warn',
      [MessageType.ERROR]: 'Error'
    };

    const newMessage: IMessage = {
      id: this.nextId++,
      text: text,
      type: type,
      title: titles[type]
    };

    this.messages = [newMessage, ...this.messages];

    setTimeout((): void => {
      this.closeMessage(newMessage.id);
    }, 5000);
  }

  closeMessage(id: number): void {
    this.messages = this.messages.filter((message: IMessage): boolean => message.id !== id);
  }

} 