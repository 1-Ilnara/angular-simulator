import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { catchError, filter, tap, EMPTY } from 'rxjs';
import { IPost } from '../../../interfaces/IPost';
import { PostEditDialogComponent } from '../../components/post-edit-dialog/post-edit-dialog.component';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    SkeletonModule,
    ContextMenuModule,
    TagModule,
    DynamicDialogModule,
  ],
  providers: [DialogService],
  templateUrl: './posts.component.html',
})
export class PostsComponent implements OnInit {

  private postService: PostService = inject(PostService);
  private router: Router = inject(Router);
  private dialogService: DialogService = inject(DialogService);

  posts: IPost[] = Array(10).fill({}) as IPost[];
  totalRecords: number = 0;
  isLoading: boolean = true;
  selectedPost: IPost | null = null;
  contextMenuItems: MenuItem[] = [];

  first: number = 0;
  rows: number = 10;

  private ref: DynamicDialogRef | null = null;

  ngOnInit(): void {
    this.postService.posts$.pipe(
      tap((posts: IPost[]): void => {
        this.posts = posts;
      })
    ).subscribe();

    this.postService.total$.pipe(
      tap((total: number): void => {
        this.totalRecords = total;
      })
    ).subscribe();

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
    this.isLoading = true;
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;

    this.postService.fetchPosts(this.rows, this.first)
      .pipe(
        tap((): void => {
          this.isLoading = false;
        }),
        catchError(() => {
          this.isLoading = false;
          return EMPTY;
        })
      )
      .subscribe();
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
    if (!this.selectedPost) {
      return;
    }

    this.ref = this.dialogService.open(PostEditDialogComponent, {
      header: 'Редактировать пост',
      width: '450px',
      data: {
        post: this.selectedPost,
      },
    });

    this.ref?.onClose
      .pipe(
        filter(Boolean),
        tap((updatedData: Partial<IPost>) => this.savePostChanges(updatedData))
      )
      .subscribe();
  }

  savePostChanges(updatedData: Partial<IPost>): void {
    if (!this.selectedPost) {
      return;
    }

    this.postService.updatePost(this.selectedPost.id, updatedData).subscribe();
  }

  deletePost(post: IPost | null): void {
    if (!post) {
      return;
    }

    this.postService.removePost(post.id).subscribe();
  }
}
