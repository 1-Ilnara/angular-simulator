import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostResponse } from '../../interfaces/IPostResponse';
import { PostApiService } from './post-api.service';
import { IPost } from '../../interfaces/IPost';


@Injectable({
  providedIn: 'root',
})
export class PostService {

  private postApiService: PostApiService = inject(PostApiService);

  fetchPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.postApiService.getPosts(limit, skip);
  }

  fetchPostById(id: number): Observable<IPost> {
    return this.postApiService.getPostById(id);
  }

  addPost(post: Omit<IPost, 'id'>): Observable<IPost> {
    return this.postApiService.createPost(post);
  }

  updatePost(id: number, post: Partial<IPost>): Observable<IPost> {
    return this.postApiService.updatePost(id, post);
  }

  removePost(id: number): Observable<IPost> {
    return this.postApiService.deletePost(id);
  }
}