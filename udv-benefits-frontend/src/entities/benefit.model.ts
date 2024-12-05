export interface Category {
  title: string;
  id: number;
}

export type Option = {
  id: number;
  title: string;
  description: string;
  requiredExperience: string;
  requiredCondition: string;
};

export interface Benefit {
  title: string;
  description: string;
  provider: string;
  price: number;
  picture: string;
  period: string;
  instructions: string;
  categoryId: number;
  isCancellable: boolean;
  id: number;
  createdAt: string;
  category: Category;
  content: {
    instructions: string;
    period: string;
    isCancellable: boolean;
  };
  options: Option[];
  requiredConditions: string[];
}

export interface BenefitsGroup {
  categoryId: number;
  categoryTitle: string;
  benefits: Benefit[];
}
