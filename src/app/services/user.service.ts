import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { IUser } from '../../interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { MessageType } from '../../enums/MessageType';
import { IMessage } from '../../interfaces/IMessage';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  private readonly usersSubject = new BehaviorSubject<IUser[]>([]);
  public readonly users$: Observable<IUser[]> = this.usersSubject.asObservable();
  private readonly isLoadingSubject = new BehaviorSubject<boolean>(false);
  public readonly isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor(
    private userApi: UserApiService,
    private loaderService: LoaderService,
    private messageService: MessageService
  ) {}

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  getUsers(): Observable<IUser[]> {
    return this.users$;
  }

  loadUsers(): Observable<IUser[]> {
    this.isLoadingSubject.next(true);
    this.loaderService.showLoader();

    return this.userApi.getUsers().pipe(
      tap(users => {
        this.setUsers(users);
      }),
      catchError(err => {
        const msg: IMessage = {
          id: Date.now(),
          title: 'Ошибка',
          text: 'Ошибка при загрузке пользователей!',
          type: MessageType.ERROR,
        };
        this.messageService.showMessage(msg);
        this.setUsers([]);
        return of([]); 
      }),
      finalize(() => {
        this.isLoadingSubject.next(false);
        this.loaderService.hideLoader();
      })
    );
  }

}