export interface Category {
  title: string;
  id: number;
}

export interface Benefit {
  title: string;
  description: string;
  price: number;
  period: string;
  instructions: string;
  categoryId: number;
  isCancellable: boolean;
  id: number;
  createdAt: string;
  category: Category;
}

export interface BenefitsGroup {
  categoryId: number;
  categoryTitle: string;
  benefits: Benefit[];
}
