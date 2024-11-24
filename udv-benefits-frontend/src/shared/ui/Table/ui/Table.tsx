import cls from "./Table.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { ColumnsConfig } from "../model/table.config";
import { ReactNode, useState } from "react";

interface TableRowProps<T extends { id: string | number }> {
  className?: string;
  isExpandable?: boolean;
  columnsConfig: ColumnsConfig<T>;
  data: T;
  expandableRowConfig: ExpandableRowCell<T>[];
}

export type ExpandableRowCell<T> = {
  render: (data: T) => ReactNode;
};

export const TableRow = <T extends { id: string | number }>({
  isExpandable,
  columnsConfig,
  expandableRowConfig,
  data,
}: TableRowProps<T>) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isExpandable)
    return (
      <>
        <tr>
          {columnsConfig.map((column, index) =>
            index === 0 ? (
              <td
                onClick={() => setIsExpanded((prevState) => !prevState)}
                key={index}
              >
                {column.render(data)}
              </td>
            ) : (
              <td key={index}>{column.render(data)}</td>
            )
          )}
        </tr>
        {isExpanded && (
          <tr>
            <td colSpan={columnsConfig.length}>
              <div
                className={cls.fullInfo}
                style={{ display: "flex", gap: "10px" }}
              >
                {expandableRowConfig.map((item) => (
                  <div key={data.id}>{item.render(data)}</div>
                ))}
              </div>
            </td>
          </tr>
        )}
      </>
    );

  return (
    <tr key={data.id}>
      {columnsConfig.map((column, index) => (
        <td key={index}>{column.render(data)}</td>
      ))}
    </tr>
  );
};

interface TableProps<T extends { id: string | number }> {
  // пока будет T
  className?: string;
  tableData: T[];
  columnsConfig: ColumnsConfig<T>;
  expandableRowConfig?: ExpandableRowCell<T>[];
  isExpandable?: boolean;
}

const Table = <T extends { id: string | number }>({
  className,
  tableData,
  columnsConfig,
  expandableRowConfig,
  isExpandable,
}: TableProps<T>) => {
  return (
    <table className={classNames(cls.table, {}, [className])}>
      <thead>
        <tr>
          {columnsConfig.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData?.map((data) => (
          <TableRow
            key={data.id}
            columnsConfig={columnsConfig}
            isExpandable={isExpandable}
            data={data}
            expandableRowConfig={expandableRowConfig}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
