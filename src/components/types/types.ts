export interface CardType {
  slug: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  minutes: number;
  id: string;
  isSaved: boolean;
  tags: object[];
}

export interface ResType {
  count: number;
  results: any[];
}
