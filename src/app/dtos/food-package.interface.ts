import { Food } from './food.interface';

export interface FoodPackage {
  id: string;
  recipeId: string;
  clientId: string;
  addressId: string;
  foods: Food[];
  status: string;
}
