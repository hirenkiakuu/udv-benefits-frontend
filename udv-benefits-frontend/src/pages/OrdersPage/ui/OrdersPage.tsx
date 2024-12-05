import { Badge, Button, Heading, Table } from "shared/ui";
import cls from "./OrdersPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { useEffect, useState } from "react";
import api from "shared/api/api";
import { Order } from "entities/order.model";
import { Column } from "shared/ui/Table/model/table.config";
import { NavLink } from "react-router-dom";
import { formatToLocalDate } from "shared/lib/formatters/formatDate";

interface OrdersPageProps {
  className?: string;
}

const columnsConfig: Column<Order>[] = [
  {
    header: "Название",
    render: (order: Order) => order.benefit.title,
  },
  {
    header: "Категория",
    render: (order: Order) => order.benefit.category.title,
  },
  {
    header: "Дата приобретения",
    render: (order: Order) => formatToLocalDate(order.createdAt),
  },
  {
    header: "Дата окончания",
    render: (order: Order) => formatToLocalDate(order.endsAt),
  },
  {
    header: "Стоимость",
    render: (order: Order) => `${order.benefit.price} U`,
  },
  {
    header: "Статус заявки",
    render: (order: Order) => <Badge status={order.status} />,
  },
  {
    header: "",
    render: (order: Order) => (
      <NavLink to={`/orders/${order.id}`}>
        <Button className={cls.leaveCommentButton} size="large">
          Просмотреть
          {order.unreadComments !== 0 && (
            <div className={cls.unreadCommentsCount}>
              {order.unreadComments}
            </div>
          )}
        </Button>
      </NavLink>
    ),
  },
];

const OrdersPage = ({ className }: OrdersPageProps) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await api.get("/api/users/me/orders");

        if (res) {
          const { data } = res;
          console.log(data);
          setOrders(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getOrders();
  }, []);

  return (
    <div className={classNames(cls.ordersPage, {}, [className])}>
      <div className={cls.ordersPageContainerInner}>
        <div className={cls.ordersPageHeading}>
          <Heading>Мои заявки</Heading>
          <p>В данной таблице можно посмотреть все свои заявки по льготам</p>
        </div>
        <Table tableData={orders} columnsConfig={columnsConfig} />
      </div>
    </div>
  );
};

export default OrdersPage;
