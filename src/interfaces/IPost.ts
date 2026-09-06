import { IPostReactions } from './IPostReactions';

export interface IPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: IPostReactions;
  views: number;
  userId: number;
}