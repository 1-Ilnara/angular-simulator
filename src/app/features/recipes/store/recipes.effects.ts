import { inject, Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, Observable, of } from 'rxjs';
import { RecipeApiService } from '../data-access/recipe-api.service';
import { IRecipesResponse } from '../interfaces/IRecipesResponse';
import { loadRecipes, loadRecipesFailure, loadRecipesSuccess } from './recipes.actions';

@Injectable()
export class RecipesEffects {

  private actions$: Actions = inject(Actions);

  private recipeApiService: RecipeApiService = inject(RecipeApiService);

  loadRecipes$: Observable<Action> = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(loadRecipes),
        exhaustMap(
          (): Observable<Action> =>
            this.recipeApiService.getRecipes().pipe(
              map(
                (response: IRecipesResponse): Action =>
                  loadRecipesSuccess({ recipes: response.recipes }),
              ),
              catchError(
                (): Observable<Action> =>
                  of(loadRecipesFailure({ error: 'Не удалось загрузить рецепты' })),
              ),
            ),
        ),
      ),
  );

}
