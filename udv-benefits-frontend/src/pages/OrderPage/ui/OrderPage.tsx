import { useEffect, useState } from "react";
import cls from "./OrderPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import api from "shared/api/api";
import { NavLink, useParams } from "react-router-dom";
import { Button, Heading } from "shared/ui";
import Arrow from "shared/assets/icons/arrow.svg";
import { Order } from "entities/order.model";
import CommentsPanel from "features/CommentsPanel";

interface OrderPageProps {
  className?: string;
}

const formatPeriod = (period: string) => {
  if (period === "one_month") return "1 месяц";
  else if (period === "three_months") return "3 месяца";
  else return "1 год";
};

const formatStatus = (status: string) => {
  if (status === "approved") return "Одобрено";
  else if (status === "rejected") return "Отклонено";
  else return "На рассмотрении";
};

const OrderPage = ({ className }: OrderPageProps) => {
  const [order, setOrder] = useState<Order>();
  const [displayableOption, setDisplayableOption] = useState(0);
  const { id } = useParams();

  const handleReject = async () => {
    try {
      const res = await api.post(`/api/orders/${id}/reject`);
      if (res) {
        setOrder((prevOrder) => ({ ...prevOrder, status: "rejected" }));
      }
    } catch (err) {
      console.error(err);
    }
  };

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
        <div className={cls.benefitImg}>
          <img
            src={order?.benefit.picture}
            className={cls.benefitImg}
            alt="Изображение льготы"
          />
        </div>
        <div className={cls.benefitInfo}>
          <div className={cls.benefitHeader}>
            <div className={cls.benefitTitle}>
              <Heading
                className={classNames(
                  cls.status,
                  {
                    [cls.danger]: order?.status === "rejected",
                    [cls.approved]: order?.status === "approved",
                    [cls.pending]: order?.status === "in_work",
                  },
                  []
                )}
              >
                {formatStatus(order?.status)}
              </Heading>
              <Heading>{order?.benefit?.title}</Heading>
            </div>

            <p>{order?.benefit.provider}</p>
          </div>

          <div className={cls.benefitDescription}>
            <div
              dangerouslySetInnerHTML={{ __html: order?.benefit.description }}
            ></div>
            <p className={cls.benefitPeriod}>
              <b>Срок действия: {formatPeriod(order?.benefit.period)}</b>
            </p>
          </div>

          {order?.benefit.options.length !== 0 && (
            <div className={cls.benefitOptionsContainer}>
              <ul className={cls.benefitOptionsList}>
                {order?.benefit.options.map((option, index) => (
                  <li
                    key={option.id}
                    className={classNames(
                      cls.benefitOptionsListItem,
                      { [cls.active]: index === displayableOption },
                      []
                    )}
                    onClick={() => setDisplayableOption(index)}
                  >
                    {option.title}
                  </li>
                ))}
              </ul>

              <div
                className={cls.benefitOptionDescription}
                dangerouslySetInnerHTML={{
                  __html:
                    order?.benefit?.options[displayableOption]?.description,
                }}
              ></div>
            </div>
          )}

          <Heading className={cls.instructionHeader} size="medium">
            Инструкция по активации
          </Heading>
          <div
            dangerouslySetInnerHTML={{
              __html: order?.benefit.content.instructions,
            }}
          ></div>
        </div>

        <div className={cls.benefitPurchase}>
          <Heading className={cls.benefitPrice} size="medium">
            {order?.benefit.price} U-points
          </Heading>

          {order?.option && (
            <div className={cls.benefitChosenOption}>
              <p>Выбранный вариант</p>
              <button className={cls.benefitOptionsButton}>
                {order?.option?.title}
              </button>
            </div>
          )}

          {order?.status == "approved" && (
            <Button
              variant="primary"
              size="large"
              className={cls.rejectButton}
              onClick={handleReject}
            >
              Отменить бенефит
            </Button>
          )}

          {order?.comments && <CommentsPanel comments={order?.comments} />}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
