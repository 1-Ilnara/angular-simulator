import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { RecipesEffects } from '../store/recipes.effects';
import { RECIPES_FEATURE_KEY, recipesReducer } from '../store/recipes.reducer';

export const recipesRoutes: Routes = [
  {
    path: '',
    providers: [provideState(RECIPES_FEATURE_KEY, recipesReducer), provideEffects(RecipesEffects)],
    loadComponent: (): Promise<Type<unknown>> =>
      import('../pages/recipes-page/recipes-page.component').then(
        (m) => m.RecipesPageComponent,
      ),
  },
];
