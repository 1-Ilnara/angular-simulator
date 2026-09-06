import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { IPost } from '../../../interfaces/IPost';

@Component({
  selector: 'app-post-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
  ],
  templateUrl: './post-edit-dialog.component.html',
})
export class PostEditDialogComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() post: IPost | null = null;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() save: EventEmitter<Partial<IPost>> = new EventEmitter<Partial<IPost>>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      tags: ['', Validators.required],
      views: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && this.post) {
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

    this.save.emit(updatedData);
    this.closeDialog();
  }

  closeDialog(): void {
    this.visibleChange.emit(false);
  }
}