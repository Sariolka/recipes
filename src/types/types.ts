export interface CardType {
  slug: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  minutes: number;
  id: string;
  isSaved?: boolean | null;
  note?: string;
  user_ratings: UserRatings;
  tags: {
    display_name: string;
    id: number;
    name: string;
    type: string;
    root_tag_type: string;
    parent_tag_type: string;
  }[];
}

export interface ResType {
  count: number;
  results: any[];
  message?: string;
}

export interface UserAuth {
  accessToken: string;
  user: {
    email: string;
    name: string;
    id: number;
  };
}

export interface Recipe {
  approved_at: number;
  aspect_ratio: string;
  beauty_url: string | null;
  brand: string | null;
  brand_id: string | null;
  buzz_id: string | null;
  canonical_id: string;
  compilations: any[];
  cook_time_minutes: number;
  country: string;
  created_at: number;
  credits: Credit[];
  description: string;
  draft_status: string;
  facebook_posts: any[];
  id: number;
  inspired_by_url: string | null;
  instructions: Instruction[];
  is_app_only: boolean;
  is_one_top: boolean;
  is_shoppable: boolean;
  is_subscriber_content: boolean;
  keywords: string;
  language: string;
  name: string;
  num_servings: number;
  nutrition: Nutrition;
  nutrition_visibility: string;
  original_video_url: string | null;
  prep_time_minutes: number;
  price: Price;
  promotion: string;
  renditions: any[];
  sections: Section[];
  seo_path: string;
  seo_title: string;
  servings_noun_plural: string;
  servings_noun_singular: string;
  show: Show;
  show_id: number;
  slug: string;
  tags: Tag[];
  thumbnail_alt_text: string;
  thumbnail_url: string;
  tips_and_ratings_enabled: boolean;
  topics: Topic[];
  total_time_minutes: number;
  total_time_tier: TotalTimeTier;
  updated_at: number;
  user_ratings: UserRatings;
  video_ad_content: string | null;
  video_id: string | null;
  video_url: string | null;
  yields: string;
}

interface Credit {
  is_verified: boolean;
  name: string;
  picture_url: string;
  type: string;
  user_id: string | null;
}

interface Instruction {
  appliance: string | null;
  display_text: string; //!
  end_time: number;
  hacks: Hack[];
  id: number;
  position: number;
  start_time: number;
  temperature: number | null;
}

interface Hack {
  end_index: number;
  id: number;
  match: string;
  start_index: number;
}

interface Nutrition {
  calories: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  protein: number;
  sugar: number;
  updated_at: string;
}

interface Price {
  consumption_portion: number;
  consumption_total: number;
  portion: number;
  total: number;
  updated_at: string;
}

interface Section {
  components: Component[];
  name: string | null;
  position: number;
}

interface Component {
  extra_comment: string;
  id: number;
  ingredient: Ingredient;
  measurements: Measurement[];
  position: number;
  raw_text: string;
}

interface Ingredient {
  created_at: number;
  display_plural: string;
  display_singular: string;
  id: number;
  name: string;
  updated_at: number;
}

interface Measurement {
  id: number;
  quantity: string;
  unit: Unit;
}

interface Unit {
  abbreviation: string;
  display_plural: string;
  display_singular: string;
  name: string;
  system: string;
}

interface Show {
  id: number;
  name: string;
}

interface Tag {
  display_name: string;
  id: number;
  name: string;
  parent_tag_name: string;
  root_tag_type: string;
  type: string;
}

interface Topic {
  name: string;
  slug: string;
}

interface TotalTimeTier {
  display_tier: string;
  tier: string;
}

export interface UserRatings {
  count_negative: number;
  count_positive: number;
  score: number;
}
