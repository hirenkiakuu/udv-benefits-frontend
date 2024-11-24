import { Badge, Button, Heading, Table } from "shared/ui";
import cls from "./OrdersFromUsersPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { useEffect, useMemo, useState } from "react";
import api from "shared/api/api";
// import ExpandingTable from "features/ExpandingTable";
import { ColumnsConfig } from "shared/ui/Table/model/table.config";
import { formatToLocalDate } from "shared/lib/formatters/formatDate";
import { Order } from "entities/order.model";
import { ExpandableRowCell } from "shared/ui/Table/ui/Table";

// const prepareTableData = (orders: Order[]) => {
//   return orders.map((order) => ({
//     id: order.id,
//     fullName: `${order.user.lastName} ${order.user.firstName} ${order.user.middleName}`, // ФИО
//     title: order.benefit.title, // Название льготы
//     type: order.benefit.category.title, // Тип льготы (категория)
//     status: order.status,
//     createdAt: new Date(order.createdAt).toLocaleDateString(), // Дата подачи
//     // Статус заявки
//     user: order.user,
//   }));
// };

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
          // setOrders(prepareTableData(res.data));
          setOrders(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getOrders();
  }, []);

  const handleAccept = async (id: number) => {
    // Remove the accepted order from the orders state
    console.log(id);

    try {
      const res = await api.post(`/api/orders/${id}/approve`);

      if (res) {
        console.log(res.data);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== id)
        );

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

  const columnsConfig: ColumnsConfig<Order> = useMemo(
    () => [
      {
        header: "ФИО",
        render: (order) => order.user.firstName,
      },
      {
        header: "Название",
        render: (order) => order.benefit.title,
      },
      {
        header: "Категория",
        render: (order) => order.benefit.category.title,
      },
      {
        header: "Дата подачи ",
        render: (order) => formatToLocalDate(order.createdAt),
      },
      {
        header: "Статус заявки",
        render: (order) => <Badge status={order.status} />,
      },
      {
        header: "",
        render: (order) => (
          <div>
            <Button size="large" onClick={() => handleReject(order.id)}>
              Отклонить
            </Button>
            <Button
              variant="primary"
              size="large"
              onClick={() => handleAccept(order.id)}
            >
              Принять
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const expandableRowConfig: ExpandableRowCell<Order>[] = useMemo(
    () => [
      {
        render: (order) => (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            <div>
              <p>
                <b>Юридическое лицо</b>
              </p>
              <p>{order.user.firstName}</p>
            </div>

            <div>
              <p>
                <b>Подразделение</b>
              </p>
              <p>{order.user.department}</p>
            </div>

            <div>
              <p>
                <b>Должность</b>
              </p>
              <p>{order.user.position}</p>
            </div>
          </div>
        ),
      },
      {
        render: (order) => (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            <div>
              <p>
                <b>Электронная почта</b>
              </p>
              <p>{order.user.email}</p>
            </div>

            <div>
              <p>
                <b>Дата рождения</b>
              </p>
              <p>{order.user.birthDate}</p>
            </div>

            <div>
              <p>
                <b>Возраст</b>
              </p>
              <p>{order.user.birthDate}</p>
            </div>
          </div>
        ),
      },
      {
        render: (order) => (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            <div>
              <p>
                <b>Телефон</b>
              </p>
              <p>{order.user.phone}</p>
            </div>

            <div>
              <p>
                <b>Время работы в UDV</b>
              </p>
              <p>{order.user.workExperience.months}</p>
            </div>

            <div>
              <p>
                <b>Есть дети</b>
              </p>
              <p>{order.user.hasChildren ? "Да" : "Нет"}</p>
            </div>
          </div>
        ),
      },
    ],
    []
  );

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
      </div>

      <Table
        columnsConfig={columnsConfig}
        tableData={orders}
        isExpandable={true}
        expandableRowConfig={expandableRowConfig}
      />
    </div>
  );
};

export default OrdersFromUsersPage;
