export interface User {
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  phone: string;
  hasChildren: boolean;
  isAdmin: boolean;
  isVerified: boolean;
  workStartDate: string;
  workEndDate: string;
  position: string;
  department: string;
  id: number;
  balance: number;
  workExperience: {
    months: string;
    years: string;
  };
}
