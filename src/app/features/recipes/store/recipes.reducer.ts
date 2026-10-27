import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IRecipesState } from '../interfaces/IRecipesState';
import { loadRecipes, loadRecipesFailure, loadRecipesSuccess } from './recipes.actions';

export const RECIPES_FEATURE_KEY: string = 'recipes';

export const initialRecipesState: IRecipesState = {
  recipes: [],
  loading: false,
  error: null,
};

export const recipesReducer: ActionReducer<IRecipesState, Action> = createReducer(
  initialRecipesState,
  on(
    loadRecipes,
    (state: IRecipesState): IRecipesState => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  on(
    loadRecipesSuccess,
    (state: IRecipesState, { recipes }): IRecipesState => ({
      ...state,
      recipes,
      loading: false,
    }),
  ),
  on(
    loadRecipesFailure,
    (state: IRecipesState, { error }): IRecipesState => ({
      ...state,
      error,
      loading: false,
    }),
  ),
);
