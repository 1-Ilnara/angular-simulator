import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IUser } from '../../../interfaces/IUser';
import { IMessage } from '../../../interfaces/IMessage';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service'; 

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
  private messageService = inject(MessageService); 

  users$!: Observable<IUser[]>;
  message$!: Observable<IMessage | null>; 
  isLoading$!: Observable<boolean>;

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
    
    this.message$ = this.messageService.message$; 

    this.userService.loadUsers().subscribe();
  }

  trackById(_index: number, u: IUser) {
    return u.id;
  }
  
}