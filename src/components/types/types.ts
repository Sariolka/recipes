export interface CardType {
  slug: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  minutes: number;
  id: string;
  isSaved: boolean;
}

export interface ResType {
  count: number;
  results: any[];
}
