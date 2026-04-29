export interface Location {
  id: number;
  name: string;
}

export interface DateItem {
  id: number;
  date: string;
}

export interface SearchData {
  location: string | number;
  date: string | number;
  participants: string | number;
}   
