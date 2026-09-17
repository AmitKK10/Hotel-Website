export type AmenityCategory = 'essential' | 'wellness' | 'dining' | 'service' | 'leisure';

export interface Amenity {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: AmenityCategory;
  featured?: boolean;
  badge?: string;
}

export interface ExperienceTimelineItem {
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  timeSlot: string;
  title: string;
  description: string;
  iconName: string;
  tag: string;
  image: string;
}
