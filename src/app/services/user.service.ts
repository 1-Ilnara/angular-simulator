import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { IUser } from '../../interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { MessageType } from '../../enums/MessageType';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApi = inject(UserApiService);
  private loaderService = inject(LoaderService);
  private messageService = inject(MessageService);
  private usersSubject = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  getUsers(): Observable<IUser[]> {
    return this.users$;
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();

    return this.userApi.getUsers().pipe(
      tap((users: IUser[]) => { 
        this.setUsers(users);
      }),
      catchError((error: unknown) => {
        this.messageService.setMessage({
          id: Date.now(),
          title: 'Ошибка',
          text: 'Ошибка при загрузке пользователей!',
          type: MessageType.ERROR
        });
        this.setUsers([]);
        return of([]);
      }),
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }

}
      