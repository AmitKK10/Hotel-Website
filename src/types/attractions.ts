export type AttractionCategory =
  | 'all'
  | 'beaches'
  | 'parks'
  | 'temples'
  | 'family'
  | 'food'
  | 'shopping'
  | 'nature'
  | 'adventure';

export interface AttractionItem {
  id: string;
  slug: string;
  title: string;
  category: AttractionCategory;
  distance: string; // e.g. "800 m" or "2.5 km"
  travelTime: string; // e.g. "3 min drive / 10 min walk"
  bestTime: string; // e.g. "5:00 AM - 7:00 AM or Sunset"
  description: string;
  highlights: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
  featured?: boolean;
  googleMapsUrl?: string;
}

export interface ItineraryStep {
  timeSlot: string; // e.g. "07:00 AM - Morning"
  title: string;
  description: string;
  location: string;
  iconName?: string;
}

export interface ItineraryDay {
  dayTitle: string;
  subtitle: string;
  steps: ItineraryStep[];
}

export interface LocalService {
  id: string;
  name: string;
  category: string;
  distance: string;
  travelTime: string;
  address: string;
  contact?: string;
  googleMapsUrl: string;
}

export interface WeatherData {
  location: string;
  tempCelsius: number;
  condition: string;
  highLow: string;
  humidity: string;
  windSpeed: string;
  sunrise: string;
  sunset: string;
  bestVisitingMonths: string;
}
