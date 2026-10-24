import { IUser } from '../../../core/interfaces/IUser';
import { IToken } from './IToken';

export interface IAuthResponse extends IUser, IToken {}
