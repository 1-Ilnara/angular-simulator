import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { IRecipe } from '../../interfaces/IRecipe';
import { loadRecipes } from '../../store/recipes.actions';
import { selectError, selectLoading, selectRecipes } from '../../store/recipes.selectors';

@Component({
  selector: 'app-recipes-page',
  imports: [RecipeCardComponent, ButtonModule],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesPageComponent implements OnInit {

  private store: Store = inject(Store);

  recipes: Signal<IRecipe[]> = this.store.selectSignal(selectRecipes);

  loading: Signal<boolean> = this.store.selectSignal(selectLoading);

  error: Signal<string | null> = this.store.selectSignal(selectError);

  ngOnInit(): void {
    this.store.dispatch(loadRecipes());
  }

  onReload(): void {
    this.store.dispatch(loadRecipes());
  }

}
