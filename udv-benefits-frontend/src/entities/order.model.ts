import { Benefit } from "./benefit.model";
import { User } from "./user.model";
import { Option } from "./benefit.model";

export type OrderStatus = "in_work" | "rejected" | "approved";

type Comment = {
  message: string;
  id: number;
  isRead: boolean;
  createdAt: string;
  attachmentId: number;
  sender: {
    id: number;
    profilePhoto: string;
    firstName: string;
    lastName: string;
    middleName: string;
  };
  attachment: {
    filename: string;
    fileUrl: string;
    id: number;
  };
};

export interface Order {
  userId: number;
  benefitId: number;
  id: number;
  status: OrderStatus;
  createdAt: string;
  activatedAt: string;
  endsAt: string;
  benefit: Benefit;
  user: User;
  option: Option | null;
  comments: Comment[];
  unreadComments: number;
}
