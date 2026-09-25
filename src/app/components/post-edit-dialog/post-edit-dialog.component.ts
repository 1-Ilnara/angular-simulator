import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { IPost } from '../../../interfaces/IPost';

@Component({
  selector: 'app-post-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
  ],
  templateUrl: './post-edit-dialog.component.html',
})
export class PostEditDialogComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private config: DynamicDialogConfig = inject(DynamicDialogConfig);

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    tags: ['', Validators.required],
    views: [0, [Validators.required, Validators.min(0)]],
  });

  post: IPost | null = null;

  ngOnInit(): void {
    this.post = this.config.data?.post ?? null;

    if (this.post) {
      this.form.patchValue({
        title: this.post.title,
        tags: Array.isArray(this.post.tags) ? this.post.tags.join(', ') : this.post.tags,
        views: this.post.views,
      });
    }
  }

  onSave(): void {
    if (this.form.invalid) {
      return;
    }

    const rawTags: string = this.form.value.tags;
    const formattedTags: string[] = typeof rawTags === 'string'
      ? rawTags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
      : rawTags;

    const updatedData: Partial<IPost> = {
      title: this.form.value.title,
      tags: formattedTags,
      views: this.form.value.views,
    };

    this.ref.close(updatedData);
  }

  closeDialog(): void {
    this.ref.close();
  }
}