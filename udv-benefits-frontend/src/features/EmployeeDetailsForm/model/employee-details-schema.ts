import { z } from "zod";

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

export const employeeDetailsSchema = z.object({
  firstName: z.string().min(1, "Имя не может быть пустым"),
  middleName: z.string().transform((val) => (val.trim() === "" ? null : val)),
  lastName: z.string().min(1, "Фамилия не может быть пустой"),
  birthDate: z
    .string()
    .regex(dateRegex, "Дата должна быть в формате dd.mm.yyyy"),
  workStartDate: z
    .string()
    .transform((val) => (val.trim() === "" ? null : val)),
  legalEntity: z.string().transform((val) => (val.trim() === "" ? null : val)),
  department: z.string().transform((val) => (val.trim() === "" ? null : val)),
  position: z.string().transform((val) => (val.trim() === "" ? null : val)),
  phone: z.string().min(1, "Номер телефона не может быть пустым"),
  hasChildren: z.boolean(),
});

export type EmployeeFormData = z.infer<typeof employeeDetailsSchema>;
