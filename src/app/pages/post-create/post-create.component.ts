import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { IPost } from '../../../interfaces/IPost';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ],
  templateUrl: './post-create.component.html',
})
export class PostCreateComponent {
  
  private fb: FormBuilder = inject(FormBuilder);
  private postService: PostService = inject(PostService);
  private router: Router = inject(Router);

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    tags: ['', Validators.required],
    userId: [1, [Validators.required, Validators.min(1)]],
    views: [0, [Validators.required, Validators.min(0)]],
    likes: [0, [Validators.required, Validators.min(0)]],
    dislikes: [0, [Validators.required, Validators.min(0)]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const rawTags: string = this.form.value.tags;
    const formattedTags: string[] = rawTags
      .split(',')
      .map((tag: string) => tag.trim())
      .filter(Boolean);

    const newPost: Omit<IPost, 'id'> = {
      title: this.form.value.title,
      body: this.form.value.body,
      tags: formattedTags,
      userId: this.form.value.userId,
      views: this.form.value.views,
      reactions: {
        likes: this.form.value.likes,
        dislikes: this.form.value.dislikes,
      },
    };

    this.postService.addPost(newPost).subscribe({
      next: (): void => {
        this.router.navigate(['/posts']);
      },
    });
  }
}