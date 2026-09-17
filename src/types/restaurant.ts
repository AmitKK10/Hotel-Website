export type MenuCategory =
  | 'all'
  | 'seafood'
  | 'bengali'
  | 'indian'
  | 'chinese'
  | 'breakfast'
  | 'desserts'
  | 'beverages';

export interface Dish {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  price: number;
  isVeg: boolean;
  isChefSpecial?: boolean;
  spiceLevel?: 0 | 1 | 2 | 3; // 0=mild, 1=low, 2=medium, 3=spicy
  image: string;
  rating?: number;
}

export interface ChefInfo {
  name: string;
  role: string;
  experienceYears: number;
  specialties: string[];
  bio: string;
  quote: string;
  image: string;
  awards: string[];
}

export interface DiningHighlight {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image: string;
  badge?: string;
}
