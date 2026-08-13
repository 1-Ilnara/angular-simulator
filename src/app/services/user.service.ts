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

  private userApi: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private STORAGE_KEY: string = 'users_data';
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    this.localStorageService.setItem(this.STORAGE_KEY, users);
  }

  getUsers(): Observable<IUser[]> {
    return this.users$;
  }

  loadUsers(): Observable<IUser[]> {
    const cachedUsers: IUser[] | null = this.localStorageService.getItem<IUser[]>(this.STORAGE_KEY);

    if (cachedUsers && cachedUsers.length > 0) {
      this.setUsers(cachedUsers);
      return of(cachedUsers);
    }

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

  addUser(newUser: IUser): void {
    const currentUsers: IUser[] = this.usersSubject.getValue();
    const updatedUsers: IUser[] = [newUser, ...currentUsers];

    this.setUsers(updatedUsers);
  }

  deleteUser(id: number): void {
    const currentUsers: IUser[] = this.usersSubject.getValue();
    const updatedUsers: IUser[] = currentUsers.filter((user: IUser) => user.id !== id);

    this.setUsers(updatedUsers);
  }

}