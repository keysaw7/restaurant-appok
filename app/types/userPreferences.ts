export interface UserPreferences {
  dietaryRestrictions: string[];
  favoriteIngredients: string[];
  dislikedIngredients: string[];
  preferredCategories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  spiceLevel: 'doux' | 'moyen' | 'épicé';
  alcoholPreference: 'oui' | 'non' | 'occasionnellement';
  previousOrders?: string[]; // IDs des plats commandés précédemment
} 