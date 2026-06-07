import { Injectable } from '@angular/core';
import { IMessage } from '../../interfaces/IMessage';
import { MessageType } from '../../enums/MessageType';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private nextId = 1;
  private _messages: IMessage[] = [];

  public get messages(): IMessage[] {
    return this._messages;
  }

  public addMessage(text: string, type: MessageType): void {
    const titles: Record<MessageType, string> = {
      [MessageType.SUCCESS]: 'Success',
      [MessageType.INFO]: 'Info',
      [MessageType.WARNING]: 'Warning',
      [MessageType.ERROR]: 'Error'
    };

    const newMessage: IMessage = {
      id: this.nextId++,
      text,
      type,
      title: titles[type]
    };

    this._messages = [newMessage, ...this._messages];

    setTimeout(() => {
      this.closeMessage(newMessage.id);
    }, 5000);
  }

  public closeMessage(id: number): void {
    this._messages = this._messages.filter(message => message.id !== id);
  }
}
