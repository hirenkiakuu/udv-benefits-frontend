import { Benefit } from "./benefit.model";

export type OrderStatus = "in_work" | "rejected" | "approved";

export interface Order {
  userId: number;
  benefitId: number;
  id: number;
  status: OrderStatus;
  createdAt: string;
  activatedAt: string;
  endsAt: string;
  benefit: Benefit;
}
