import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipesResponse } from '../interfaces/IRecipesResponse';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {

  private http: HttpClient = inject(HttpClient);

  private apiUrl: string = 'https://dummyjson.com/recipes';

  getRecipes(): Observable<IRecipesResponse> {
    return this.http.get<IRecipesResponse>(this.apiUrl);
  }

}
