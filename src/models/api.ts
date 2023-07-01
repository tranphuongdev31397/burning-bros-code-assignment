export interface Params {
  skip: number;
  limit: number;
  q?: string;
}

export interface ResponseList<T> {
  total: number;
  skip: number;
  limit: number;
  products: T[];
}
