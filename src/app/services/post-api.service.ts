import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostResponse } from '../../interfaces/IPostResponse';
import { IPost } from '../../interfaces/IPost';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  
  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = 'https://dummyjson.com/posts';

  getPosts(limit: number, skip: number): Observable<IPostResponse> {
    const params: HttpParams = new HttpParams()
      .set('limit', limit.toString())
      .set('skip', skip.toString());

    return this.http.get<IPostResponse>(this.baseUrl, { params });
  }

  getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.baseUrl}/${id}`);
  }

  createPost(post: Omit<IPost, 'id'>): Observable<IPost> {
    return this.http.post<IPost>(`${this.baseUrl}/add`, post);
  }

  updatePost(id: number, post: Partial<IPost>): Observable<IPost> {
    return this.http.put<IPost>(`${this.baseUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<IPost> {
    return this.http.delete<IPost>(`${this.baseUrl}/${id}`);
  }
}