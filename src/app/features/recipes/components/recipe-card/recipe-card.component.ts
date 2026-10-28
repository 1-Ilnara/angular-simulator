import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { IRecipe } from '../../interfaces/IRecipe';

@Component({
  selector: 'app-recipe-card',
  imports: [CardModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent {

  recipe: InputSignal<IRecipe> = input.required<IRecipe>();

  totalTimeMinutes: Signal<number> = computed(
    (): number => this.recipe().prepTimeMinutes + this.recipe().cookTimeMinutes,
  );

}
