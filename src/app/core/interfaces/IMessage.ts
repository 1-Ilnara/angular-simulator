import { MessageType } from '../../shared/enums/MessageType';
export interface IMessage {
  id: number;
  text: string;
  type: MessageType;
  title: string;
}
