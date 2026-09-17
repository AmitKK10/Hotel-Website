export type PackageCategory =
  | 'all'
  | 'weekend'
  | 'honeymoon'
  | 'family'
  | 'corporate'
  | 'friends'
  | 'staycation'
  | 'festive'
  | 'adventure';

export interface PackageItem {
  id: string;
  slug: string;
  title: string;
  category: PackageCategory;
  duration: string; // e.g. "2 Nights / 3 Days"
  price: number; // e.g. 11999
  originalPrice?: number; // e.g. 14999
  discount?: string; // e.g. "20% OFF"
  features: string[];
  idealFor: string;
  availability: string; // e.g. "Valid till Oct 31, 2026"
  limitedRibbon?: string; // e.g. "Bestseller" or "Limited Edition"
  image: string;
  featured?: boolean;
}

export interface ResortExperience {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface PromoStripItem {
  id: string;
  text: string;
  highlight?: string;
  iconName?: string;
}
