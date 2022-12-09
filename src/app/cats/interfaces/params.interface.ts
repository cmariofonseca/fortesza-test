export interface Pararams {
  limit?: number;
  breed_ids?: string;
  origin?: string;
  name?: string;
  categories_id?: number;
}

export interface Category {
  id:number,
  name: string
}

export const limities = [15, 30, 45, 75, 100];
