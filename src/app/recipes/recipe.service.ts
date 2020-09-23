import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

//   private recipes: Recipe[] = [
//     new Recipe(
//       'Schnitzel',
//       'Just a schnitzel',
//       'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
//       [new Ingredient('Meat', 1), new Ingredient('Fries', 20)]
//     ),
//     new Recipe(
//       'Burger',
//       'Just a burger',
//       'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
//       [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
//     ),
//   ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChanged.next([...this.recipes]);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next([...this.recipes]);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next([...this.recipes]);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next([...this.recipes]);
  }
}
