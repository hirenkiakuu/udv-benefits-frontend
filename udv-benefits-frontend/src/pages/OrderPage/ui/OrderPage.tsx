import { useEffect, useState } from "react";
import cls from "./OrderPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import api from "shared/api/api";
import { NavLink, useParams } from "react-router-dom";
import { Button, Heading } from "shared/ui";
import BenefitPlaceholder from "shared/assets/images/benefit-placeholder.png";
import Arrow from "shared/assets/icons/arrow.svg";

interface Order {
  benefitId: number;
  userId: number;
  id: number;
  status: string;
  createdAt: string;
  activatedAt: string;
  endsAt: string;
  benefit: {
    title: string;
    description: string;
    price: number;
    period: string;
    instructions: string;
    categoryId: number;
    isCancellable: true;
    id: number;
    createdAt: string;
    category: {
      title: string;
      id: number;
    };
  };
}

interface OrderPageProps {
  className?: string;
}

const formatPeriod = (period: string) => {
  if (period === "one_month") return "1 месяц";
  else if (period === "three_months") return "3 месяца";
  else return "1 год";
};

const formatStatus = (status: string) => {
  if (status === "accepted") return "Одобрено";
  else if (status === "rejected") return "Отклонено";
  else return "В рассмотрении";
};

const OrderPage = ({ className }: OrderPageProps) => {
  const [order, setOrder] = useState<Order>();
  const { id } = useParams();

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await api.get(`/api/orders/${id}`);

        if (res) {
          console.log(res);

          const { data } = res;

          setOrder(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getOrder();
  }, []);

  return (
    <div className={classNames(cls.orderPage, {}, [className])}>
      <div className={cls.orderPageContainerInner}>
        <NavLink className={cls.backButton} to="/orders">
          <Arrow width="24px" height="24px" />
        </NavLink>
        <div className={cls.left}>
          <div className={cls.pageHeader}>
            <img width="72px" height="72px" src={BenefitPlaceholder} alt="" />
            <Heading>{order?.benefit.title}</Heading>
          </div>
          <div className={cls.orderInfo}>
            <p>{order?.benefit.description}</p>
            <p>Срок действия: {formatPeriod(order?.benefit.period)}</p>
          </div>

          <Heading size="medium">Инструкция по активации:</Heading>
          <p>{order?.benefit.instructions}</p>
        </div>

        <div className={cls.right}>
          <Heading>{order?.benefit.price} U</Heading>
          <Heading>{formatStatus(order?.status)}</Heading>

          <div className={cls.orderTransactionInfo}>
            <Heading size="medium">Данные об операции</Heading>
            <p>
              Дата поступления заявки:{" "}
              {new Date(order?.createdAt).toLocaleString()}
            </p>
          </div>
          {order?.benefit.isCancellable && (
            <Button variant="primary" size="large">
              Отменить бенефит
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
