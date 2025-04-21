export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'entrée' | 'plat' | 'dessert' | 'boisson';
  ingredients: string[];
  allergens: string[];
  dietaryRestrictions: string[];
  imageUrl?: string;
  recommendedPairings?: string[];
  popularityScore?: number;
} 