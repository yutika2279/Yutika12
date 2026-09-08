export type MenuCategory = 'all' | 'coffee' | 'non-coffee' | 'bites' | 'desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'non-coffee' | 'bites' | 'desserts';
  price: number; // in INR
  description: string;
  tags: string[];
  image: string;
  tastingNotes?: string[];
  temperature?: 'Hot' | 'Iced' | 'Both';
  dietary?: ('Vegan' | 'GF' | 'Dairy-Free' | 'Nut-Free')[];
  pairingRecommendation?: string;
  isBestseller?: boolean;
  isStaffPick?: boolean;
}

export type SpaceMoodId = 'study' | 'main-character' | 'catch-up';

export interface SpaceMood {
  id: SpaceMoodId;
  name: string;
  tagline: string;
  badge: string;
  vibeDescription: string;
  quote: string;
  bestFor: string[];
  ambientAudioName: string;
  ambientAudioType: 'lofi' | 'rain' | 'chatter';
  recommendedPairing: {
    drink: string;
    food: string;
  };
  features: {
    iconName: string;
    title: string;
    description: string;
  }[];
  photos: {
    url: string;
    caption: string;
    tag: string;
  }[];
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  tag: string;
}

export interface CafeReview {
  id: string;
  author: string;
  role: string;
  comment: string;
  favoriteOrder: string;
  rating: number;
  avatar: string;
}
