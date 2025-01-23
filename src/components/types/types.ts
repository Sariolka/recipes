export interface CardType {
  slug: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  minutes: number;
  id: string;
  isSaved: boolean;
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
}
