import { RoomType } from '../config/whatsapp.config';

export type RoomCategory = 'all' | 'sea-view' | 'family' | 'luxury' | 'suite' | 'popular' | 'best-value';

export interface RoomAmenity {
  name: string;
  icon?: string;
}

export interface Room {
  id: string;
  slug: string;
  name: RoomType;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  capacity: string;
  size: string; // e.g. "450 sq.ft"
  bedType: string; // e.g. "King Size Bed"
  view: string; // e.g. "100% Sea Facing"
  images: string[];
  amenities: string[];
  features: string[];
  policies: string[];
  isPopular?: boolean;
  isBestValue?: boolean;
  isSeaView?: boolean;
  isFamily?: boolean;
  isSuite?: boolean;
  categoryTags: RoomCategory[];
}
