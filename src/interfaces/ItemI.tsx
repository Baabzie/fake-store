interface Rating {
  count: number;
  rate: number;
}

export interface ItemI {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
}
