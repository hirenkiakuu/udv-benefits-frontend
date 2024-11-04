import { Heading } from "shared/ui";
import cls from "./OrdersFromUsersPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { useEffect, useState } from "react";
import api from "shared/api/api";
import ExpandingTable from "features/ExpandingTable";

const prepareTableData = (orders: Order[]) => {
  return orders.map((order) => ({
    id: order.id,
    fullName: `${order.user.lastName} ${order.user.firstName} ${order.user.middleName}`, // ФИО
    title: order.benefit.title, // Название льготы
    type: order.benefit.category.title, // Тип льготы (категория)
    status: order.status,
    createdAt: new Date(order.createdAt).toLocaleDateString(), // Дата подачи
    // Статус заявки
    user: order.user,
  }));
};

interface User {
  lastName: string;
  firstName: string;
  middleName?: string;
}

interface Benefit {
  title: string;
  category: {
    title: string;
  };
}

interface Order {
  id: number;
  user: User;
  benefit: Benefit;
  status: string;
  createdAt: string; // Можно использовать Date, если вы обрабатываете его в другом месте
}

interface OrdersFromUsersPageProps {
  className?: string;
}

const OrdersFromUsersPage = ({ className }: OrdersFromUsersPageProps) => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await api.get("/api/orders");

        if (res) {
          console.log(res.data);
          setOrders(prepareTableData(res.data));
        }
      } catch (err) {
        console.error(err);
      }
    };

    getOrders();
  }, []);

  const handleAccept = async (id: number) => {
    // Remove the accepted order from the orders state

    try {
      const res = await api.post(`/api/orders/${id}/approve`);

      if (res) {
        console.log(res.data);
        // setOrders((prevOrders) =>
        //   prevOrders.filter((order) => order.id !== id)
        // );

        setOrders((prevOrders: Order[]) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, status: "approved" } : order
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id: number) => {
    // Remove the accepted order from the orders state

    try {
      const res = await api.post(`/api/orders/${id}/reject`);

      if (res) {
        console.log(res.data);
        // setOrders((prevOrders) =>
        //   prevOrders.filter((order) => order.id !== id)
        // );

        setOrders((prevOrders: Order[]) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, status: "rejected" } : order
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classNames(cls.ordersFromUsersPage, {}, [className])}>
      <div className={cls.pageHeader}>
        <div className={cls.pageTitle}>
          <Heading>Заявки на получение льгот</Heading>
          <p>
            Здесь вы можете просмотреть все новые заявки и одобрить или
            отклонить их
          </p>
        </div>
        {/* <Button variant="primary" size="large">
          Принять все
        </Button> */}
      </div>

      <ExpandingTable
        tableHeaders={[
          "ФИО",
          "Название",
          "Категория",
          "Статус",
          "Дата подачи",
          "",
        ]}
        data={orders}
        onAccept={handleAccept}
        onAcceptTitle={"Принять"}
        onReject={handleReject}
        onRejectTitle="Отклонить"
      />

      {/* <table></table> */}
      {/* <table className={classNames(cls.ordersTable, {}, [className])}>
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Название</th>
            <th>Тип</th>
            <th>Статус</th>
            <th>Дата подачи</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <TableRow data={mockObj} />
          <TableRow data={mockObj} />
        </tbody>
      </table> */}
    </div>
  );
};

export default OrdersFromUsersPage;
