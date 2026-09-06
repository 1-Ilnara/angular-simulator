import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { SkeletonModule } from 'primeng/skeleton';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IPostResponse } from '../../../interfaces/IPostResponse';
import { IPost } from '../../../interfaces/IPost';
import { PostService } from '../../services/post.service';
import { PostEditDialogComponent } from '../../components/post-edit-dialog/post-edit-dialog.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    SkeletonModule,
    ContextMenuModule,
    TagModule,
    PostEditDialogComponent,
  ],
  templateUrl: './posts.component.html',
})
export class PostsComponent implements OnInit {

  private postService: PostService = inject(PostService);
  private router: Router = inject(Router);

  posts: IPost[] = Array(10).fill({}) as IPost[];
  totalRecords: number = 0;
  loading: boolean = true;
  selectedPost: IPost | null = null;
  contextMenuItems: MenuItem[] = [];
  isEditDialogVisible: boolean = false;

  first: number = 0;
  rows: number = 10;

  ngOnInit(): void {
    this.contextMenuItems = [
      {
        label: 'Просмотр',
        icon: 'pi pi-fw pi-eye',
        command: (): void => this.viewPost(this.selectedPost),
      },
      {
        label: 'Редактировать',
        icon: 'pi pi-fw pi-pencil',
        command: (): void => this.openEditDialog(),
      },
      {
        label: 'Удалить',
        icon: 'pi pi-fw pi-trash',
        command: (): void => this.deletePost(this.selectedPost),
      },
    ];
  }

  loadPosts(event: TableLazyLoadEvent): void {
    this.loading = true;
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;

    this.postService.fetchPosts(this.rows, this.first).subscribe({
      next: (response: IPostResponse): void => {
        this.posts = response.posts;
        this.totalRecords = response.total;
        this.loading = false;
      },
      error: (): void => {
        this.loading = false;
      },
    });
  }

  onRowDblClick(post: IPost): void {
    this.viewPost(post);
  }

  viewPost(post: IPost | null): void {
    if (post) {
      this.router.navigate(['/posts', post.id]);
    }
  }

  openEditDialog(): void {
    if (this.selectedPost) {
      this.isEditDialogVisible = true;
    }
  }

  savePostChanges(updatedData: Partial<IPost>): void {
    if (!this.selectedPost) {
      return;
    }

    this.postService.updatePost(this.selectedPost.id, updatedData).subscribe({
      next: (updatedPost: IPost): void => {
        this.posts = this.posts.map((p: IPost) =>
          p.id === updatedPost.id ? { ...p, ...updatedPost } : p
        );
      },
    });
  }

  deletePost(post: IPost | null): void {
    if (!post) {
      return;
    }

    this.postService.removePost(post.id).subscribe({
      next: (): void => {
        this.posts = this.posts.filter((p: IPost) => p.id !== post.id);
        this.totalRecords--;
      },
    });
  }
}