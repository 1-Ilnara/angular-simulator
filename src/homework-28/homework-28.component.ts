import { Component } from '@angular/core';
import { CdDefaultComponent } from './cd-default/cd-default.component';
import { CdOnPushComponent } from './cd-on-push/cd-on-push.component';
import { ParentComponent } from './parent/parent.component';

@Component({
  selector: 'app-homework-28',
  imports: [ParentComponent, CdDefaultComponent, CdOnPushComponent],
  templateUrl: './homework-28.component.html',
  styleUrl: './homework-28.component.scss',
})
export class Homework28Component {}
