import { createAction, props } from '@ngrx/store';
import { IRecipe } from '../interfaces/IRecipe';

export const loadRecipes = createAction('[Recipes] Load recipes');

export const loadRecipesSuccess = createAction(
  '[Recipes] Load recipes success',
  props<{ recipes: IRecipe[] }>(),
);

export const loadRecipesFailure = createAction(
  '[Recipes] Load recipes failure',
  props<{ error: string }>(),
);
