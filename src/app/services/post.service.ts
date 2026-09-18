import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IPost } from '../../interfaces/IPost';
import { IPostResponse } from '../../interfaces/IPostResponse';
import { PostApiService } from './post-api.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private postApiService: PostApiService = inject(PostApiService);

  private postsSubject = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();

  private totalSubject = new BehaviorSubject<number>(0);
  total$: Observable<number> = this.totalSubject.asObservable();

  fetchPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.postApiService.getPosts(limit, skip).pipe(
      tap((response: IPostResponse): void => {
        this.postsSubject.next(response.posts);
        this.totalSubject.next(response.total);
      })
    );
  }

  fetchPostById(id: number): Observable<IPost> {
    return this.postApiService.getPostById(id);
  }

  addPost(post: Omit<IPost, 'id'>): Observable<IPost> {
    return this.postApiService.createPost(post).pipe(
      tap((newPost: IPost): void => {
        const currentPosts = this.postsSubject.getValue();
        this.postsSubject.next([newPost, ...currentPosts]);
        this.totalSubject.next(this.totalSubject.getValue() + 1);
      })
    );
  }

  updatePost(id: number, post: Partial<IPost>): Observable<IPost> {
    return this.postApiService.updatePost(id, post).pipe(
      tap((updatedPost: IPost): void => {
        const currentPosts = this.postsSubject.getValue();
        const updatedPosts = currentPosts.map((p: IPost) =>
          p.id === updatedPost.id ? { ...p, ...updatedPost } : p
        );
        this.postsSubject.next(updatedPosts);
      })
    );
  }

  removePost(id: number): Observable<IPost> {
    return this.postApiService.deletePost(id).pipe(
      tap(() => {
        const currentPosts = this.postsSubject.getValue();
        this.postsSubject.next(currentPosts.filter((p: IPost) => p.id !== id));
        this.totalSubject.next(this.totalSubject.getValue() - 1);
      })
    );
  }
}