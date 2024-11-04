import { Heading } from "shared/ui";
import cls from "./OrdersPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import Table from "features/Table";
import { useEffect, useState } from "react";
import api from "shared/api/api";
import { Benefit } from "entities/benefit.model";

interface OrdersPageProps {
  className?: string;
}

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
        <Table tableData={orders} />
      </div>
    </div>
  );
};

export default OrdersPage;
