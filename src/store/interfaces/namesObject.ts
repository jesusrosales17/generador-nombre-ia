export interface NamesState {
  names: NameObject[];
}

export interface NameObject {
  name: string;
  description: string;
  isFavorite?: boolean;
}
