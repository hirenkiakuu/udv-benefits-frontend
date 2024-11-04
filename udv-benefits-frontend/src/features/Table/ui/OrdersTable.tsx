import { Button } from "shared/ui";
import cls from "./OrdersTable.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
// import { Benefit } from "entities/benefit.model";
import { NavLink } from "react-router-dom";
import { Benefit } from "entities/benefit.model";

interface BenefitExt extends Benefit {
  benefit: Benefit;
  category: {
    categoryId: number;
    title: string;
  };
}

interface Order {
  benefitId: number;
  userId: number;
  id: number;
  status: string;
  createdAt: string;
  activatedAt: string;
  endsAt: string;
  benefit: BenefitExt;
}

interface TableProps {
  className?: string;
  tableData: Order[];
}

const OrdersTable = ({ className, tableData }: TableProps) => {
  // const status = order.status === "in_work" ? "в работе" : order;

  return (
    <table className={classNames(cls.ordersTable, {}, [className])}>
      <thead>
        <tr>
          <th>Название</th>
          <th>Категория</th>
          <th>Статус заявки</th>
          <th>Дата приобретения</th>
          <th>Дата окончания</th>
          <th>Стоимость</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((order) => (
          <tr key={order.id}>
            <td>{order.benefit.title}</td>
            <td>{order.benefit.category.title}</td>
            <td
              className={classNames(
                cls.status,
                {
                  [cls.accepted]: order.status === "approved",
                  [cls.rejected]: order.status === "rejected",
                  [cls.pending]: order.status === "in_work",
                },
                []
              )}
            >
              {order.status}
            </td>
            <td>
              {order.activatedAt
                ? new Date(order.activatedAt).toLocaleString()
                : "-"}
            </td>
            <td>
              {order.endsAt ? new Date(order.endsAt).toLocaleString() : "-"}
            </td>
            <td>{order.benefit.price} U</td>
            <td>
              <NavLink to={`/orders/${order.id}`}>
                <Button size="large">Просмотреть</Button>
              </NavLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
