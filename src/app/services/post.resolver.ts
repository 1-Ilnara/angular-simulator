import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from '../../interfaces/IPost';
import { PostService } from './post.service';

export const postResolver: ResolveFn<IPost> = (
  route: ActivatedRouteSnapshot
): Observable<IPost> => {
  const postService: PostService = inject(PostService);
  const postId: number = Number(route.paramMap.get('id'));

  return postService.fetchPostById(postId);
};