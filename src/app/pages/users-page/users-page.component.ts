import { Component, OnInit, inject, ChangeDetectionStrategy, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { IUser } from '../../../interfaces/IUser';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UsersFilterComponent } from '../../components/users-filter/users-filter.component';
import { UserCreateComponent } from '../../components/user-create/user-create.component';
import { PluralPipe } from '../../pipes/plural.pipe/plural.pipe.component';



@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    CommonModule,
    UserCardComponent,
    UsersFilterComponent,
    UserCreateComponent,
    PluralPipe,
  ],
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent implements OnInit {

  private userService = inject(UserService);

  private filterSubject = new BehaviorSubject<string>('');
  filter$: Observable<string> = this.filterSubject.asObservable();

  users$: Observable<IUser[]> = this.userService.getUsers();

  filteredUsers$: Observable<IUser[]> = combineLatest([this.users$, this.filter$]).pipe(
    map(([users, filterTerm]: [IUser[], string]) => {
      const cleanTerm = filterTerm.trim().toLowerCase();
      if (!cleanTerm) {
        return users;
      }
      return users.filter((user: IUser) =>
        user.name.toLowerCase().includes(cleanTerm)
      );
    })
  );

  ngOnInit(): void {
    this.userService.loadUsers().subscribe();
  }

  onFilterChange(term: string): void {
    this.filterSubject.next(term);
  }

  onCreateUser(newUser: IUser): void {
    this.userService.addUser(newUser);
  }

  onDeleteUser(id: number): void {
    this.userService.deleteUser(id);
  }

}