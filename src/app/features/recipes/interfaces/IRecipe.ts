export interface IRecipe {
  id: number;
  name: string;
  cuisine: string;
  difficulty: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  rating: number;
  reviewCount: number;
  image: string;
}
