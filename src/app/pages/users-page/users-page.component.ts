import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { IUser } from '../../../interfaces/IUser';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent implements OnInit {

  private userService = inject(UserService);

  users$: Observable<IUser[]> = this.userService.getUsers();

  ngOnInit(): void {
    this.userService.loadUsers().subscribe();
  }

}