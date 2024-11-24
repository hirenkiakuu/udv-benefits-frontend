import { ReactNode } from "react";

export type Column<T> = {
  header: string;
  render: (data: T) => ReactNode;
};

export type ColumnsConfig<T> = Column<T>[];
