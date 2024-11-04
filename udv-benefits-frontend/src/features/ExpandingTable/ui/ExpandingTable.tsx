import { useState } from "react";
import cls from "./ExpandingTable.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui";

interface User {
  email: string;
  phone: string;
  birthDate: string;
  hasChildren: boolean;
  position?: string;
  department?: string;
}

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  user: User; // Добавляем поле user
  isVerified: boolean;
  status: "approved" | "rejected" | "in_work"; // Adjust as per your needs
  workExperience: {
    months: string;
    years: string;
  };
  email: string;
  phone: string;
  birthDate: string;
  hasChildren: boolean;
  position?: string;
  department?: string;
}
interface TableRowProps {
  data: UserData;
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
  onAcceptTitle?: string;
  onRejectTitle?: string;
  tempMode?: boolean;
  onEdit?: (userId: number) => void;
}

function formatWorkExperience(workExperience: {
  months: string;
  years: string;
}) {
  if (!workExperience) return null;
  const { years, months } = workExperience;

  // Преобразуем строки в числа
  const yearsNum = parseInt(years, 10);
  const monthsNum = parseInt(months, 10);

  // Функция для склонения слова "год"
  const getYearsText = (years: number) => {
    if (years === 1) return "год";
    if (years >= 2 && years <= 4) return "года";
    return "лет";
  };

  // Функция для склонения слова "месяц"
  const getMonthsText = (months: number) => {
    if (months === 1) return "месяц";
    if (months >= 2 && months <= 4) return "месяца";
    return "месяцев";
  };

  let result = "";

  if (yearsNum) {
    result += `${yearsNum} ${getYearsText(yearsNum)}`;
  }
  if (monthsNum) {
    result +=
      (result ? " и " : "") + `${monthsNum} ${getMonthsText(monthsNum)}`;
  }

  return result;
}

export const TableRow = ({
  data,
  onAccept,
  onReject,
  onAcceptTitle,
  onRejectTitle,
  tempMode,
  onEdit,
}: TableRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusClass =
    data.status === "approved"
      ? cls.approved
      : data.status === "rejected"
        ? cls.rejected
        : data.status === "in_work"
          ? cls.pending
          : "";

  if (tempMode)
    return (
      <>
        <tr>
          <td onClick={() => setIsExpanded((prevState) => !prevState)}>
            {data.lastName + " " + data.firstName + " " + data.middleName}
          </td>
          <td></td>
          <td></td>
          <td>
            <div className={cls.actionButtons}>
              {!data.isVerified && (
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => onAccept(data.id)}
                >
                  Принять сотрудника
                </Button>
              )}
              {onEdit && (
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => onEdit(data.id)}
                >
                  Редактировать сотрудника
                </Button>
              )}
            </div>
          </td>
        </tr>
        {isExpanded && (
          <tr>
            <td colSpan={4}>
              <div className={cls.fullInfo}>
                <p>Электронная почта: {data.email}</p>
                <p>Телефон: {data.phone}</p>
                <p>Дата рождения: {data.birthDate}</p>
                <p>Есть дети: {data.hasChildren ? "Да" : "Нет"}</p>
                <p>Должность: {data.position || "Не определено"}</p>
                <p>Отдел: {data.department || "Не определено"}</p>
                <p>
                  Опыт работы:{" "}
                  {formatWorkExperience(data.workExperience) || "Не определено"}
                </p>
                <p>Сотрудник верифицирован: {data.isVerified ? "Да" : "Нет"}</p>
                {/* <p>Опыт работы: {data.workExperience || "Не определено"}</p> */}
              </div>
            </td>
          </tr>
        )}
      </>
    );

  return (
    <>
      <tr>
        <td onClick={() => setIsExpanded((prevState) => !prevState)}>
          {Object.values(data)[1]}
        </td>
        {Object.values(data)
          .slice(2, 6)
          .map((value, index) => (
            <td key={index} className={index === 2 ? statusClass : ""}>
              {value}
            </td>
          ))}
        <td>
          <div className={cls.actionButtons}>
            {onAccept &&
              data.status !== "approved" &&
              data.status !== "rejected" && (
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => onAccept(data.id)}
                >
                  {onAcceptTitle}
                </Button>
              )}
            {onReject && data.status !== "rejected" && (
              <Button
                variant="default"
                size="large"
                onClick={() => onReject(data.id)}
              >
                {onRejectTitle}
              </Button>
            )}
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={Object.keys(data).length + 1}>
            <div className={cls.fullInfo}>
              <p>Электронная почта: {data.user.email}</p>
              <p>Телефон: {data.user.phone}</p>
              <p>Дата рождения: {data.user.birthDate}</p>
              <p>Есть дети: {data.user.hasChildren ? "Да" : "Нет"}</p>
              <p>Должность: {data.user.position}</p>
              <p>Отдел: {data.user.department || "Не определено"}</p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

interface ExpandingTableProps {
  className?: string;
  tableHeaders: string[];
  data: UserData[];
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
  onAcceptTitle?: string;
  onRejectTitle?: string;
}

const ExpandingTable = ({
  className,
  tableHeaders,
  data,
  onAccept,
  onReject,
  onAcceptTitle,
  onRejectTitle,
}: ExpandingTableProps) => {
  console.log(data);
  return (
    <table className={classNames(cls.expandingTable, {}, [className])}>
      <thead>
        {tableHeaders.map((tableHeader) => (
          <th key={tableHeader}>{tableHeader}</th>
        ))}
      </thead>
      <tbody>
        {data?.map((item, index) => (
          // {console.log(item)}
          <TableRow
            key={index}
            data={item}
            onAccept={onAccept}
            onReject={onReject}
            onAcceptTitle={onAcceptTitle}
            onRejectTitle={onRejectTitle}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ExpandingTable;
