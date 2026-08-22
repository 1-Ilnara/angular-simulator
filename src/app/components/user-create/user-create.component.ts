import { Component,Output,EventEmitter,inject,ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { IUser } from '../../../interfaces/IUser';
import { HoverBoldDirective } from '../../directives/hover-bold.directive/hover-bold.directive.component';
import { AnimatedGradientDirective } from '../../directives/animated-gradient.directive/animated-gradient.directive.component';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HoverBoldDirective,
    AnimatedGradientDirective,
  ],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateComponent {

  private fb: FormBuilder = inject(FormBuilder);

  @Output() createUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  userForm: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ],
    ],
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ],
    ],
    phone: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(25),
      ],
    ],
    website: ['', [Validators.maxLength(100)]],
    address: this.fb.group({
      city: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', [Validators.maxLength(50)]],
      zipcode: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      geo: this.fb.group({
        lat: ['', [Validators.required]],
        lng: ['', [Validators.required]],
      }),
    }),
    company: this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['', [Validators.maxLength(200)]],
      bs: ['', [Validators.maxLength(100)]],
    }),
  });

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue: IUser = this.userForm.value as IUser;
    const newUser: IUser = {
      ...formValue,
      id: Date.now(),
    };

    this.createUser.emit(newUser);
    this.userForm.reset();
  }

}