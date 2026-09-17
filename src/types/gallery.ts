export type GalleryCategory =
  | 'all'
  | 'rooms'
  | 'sea-view'
  | 'swimming-pool'
  | 'restaurant'
  | 'beach'
  | 'family'
  | 'sunset'
  | 'events'
  | 'drone';

export interface GalleryItem {
  id: string;
  title: string;
  slug: string;
  category: GalleryCategory;
  image: string;
  thumbnail?: string;
  videoUrl?: string; // Optional HTML5 video or preview URL
  isVideo?: boolean;
  featured?: boolean;
  aspectRatio?: 'tall' | 'wide' | 'square';
  alt: string;
  location?: string;
  tags?: string[];
}
