import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { IUser } from '../../interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { LocalStorageService } from './local-storage.service';
import { MessageType } from '../../enums/MessageType';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApi = inject(UserApiService);
  private loaderService = inject(LoaderService);
  private messageService = inject(MessageService);
  private localStorageService = inject(LocalStorageService);

  private STORAGE_KEY = 'users_data';
  private usersSubject = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  getUsers(): Observable<IUser[]> {
    return this.users$;
  }

  loadUsers(): Observable<IUser[]> {
    const cachedUsers = this.localStorageService.getItem<IUser[]>(this.STORAGE_KEY);

    if (cachedUsers && cachedUsers.length > 0) {
      this.setUsers(cachedUsers);
      return of(cachedUsers);
    }

    this.loaderService.showLoader();

    return this.userApi.getUsers().pipe(
      tap((users: IUser[]) => {
        this.setUsers(users);
        this.localStorageService.setItem(this.STORAGE_KEY, users);
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

  addUser(newUser: IUser): void {
    const currentUsers = this.usersSubject.getValue();
    const updatedUsers = [newUser, ...currentUsers];

    this.setUsers(updatedUsers);
    this.localStorageService.setItem(this.STORAGE_KEY, updatedUsers);
  }

  deleteUser(id: number): void {
    const currentUsers = this.usersSubject.getValue();
    const updatedUsers = currentUsers.filter((user: IUser) => user.id !== id);

    this.setUsers(updatedUsers);
    this.localStorageService.setItem(this.STORAGE_KEY, updatedUsers);
  }

}