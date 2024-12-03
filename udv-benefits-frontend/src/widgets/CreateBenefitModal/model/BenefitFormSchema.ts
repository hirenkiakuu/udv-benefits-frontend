export type BenefitFormData = {
  title: string;
  provider: string;
  description: string;
  price: number;
  requiredExperience: string;
  childsRequired: boolean;
  categoryId: number;
  isActive: boolean;
  instructions: string;
  period: string;
  isCancellable: boolean;
  image: File;
  options: {
    title: string;
    description: string;
    requiredExperience: string;
  }[];
};
