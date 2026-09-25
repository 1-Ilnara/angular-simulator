import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { IPost } from '../../../interfaces/IPost';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, ButtonModule, RouterLink],
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  
  route: ActivatedRoute = inject(ActivatedRoute);
  post!: IPost;

  ngOnInit(): void {
    this.post = this.route.snapshot.data['post'] as IPost;
  }
}