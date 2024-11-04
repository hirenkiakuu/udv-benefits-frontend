import api from "shared/api/api";
import cls from "./MyBenefitsPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, Heading } from "shared/ui";
import { useEffect, useState } from "react";
import { Benefit } from "entities/benefit.model";
import { createPortal } from "react-dom";
import CreateBenefitModal from "widgets/CreateBenefitModal";

interface MyBenefitsPageProps {
  className?: string;
}

interface BenefitExt extends Benefit {
  benefit: Benefit;
  category: {
    categoryId: number;
    title: string;
  };
}

const MyBenefitsPage = ({ className }: MyBenefitsPageProps) => {
  const [myBenefits, setMyBenefits] = useState<BenefitExt[]>();
  const [isBenefitModalVisible, setIsBenefitModalVisible] = useState(false);

  useEffect(() => {
    const getMyBenefits = async () => {
      try {
        const res = await api.get("/api/benefits");

        if (res) {
          const { data } = res;
          setMyBenefits(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getMyBenefits();
  }, []);

  const handleCreateBenefitClick = () => {
    setIsBenefitModalVisible(true);
  };

  const handleOnCloseClick = () => {
    setIsBenefitModalVisible(false);
  };

  return (
    <div className={classNames(cls.myBenefitsPage, {}, [className])}>
      <div className={cls.pageHeader}>
        <div className={cls.pageTitle}>
          <Heading>Все льготы</Heading>
          <p>
            В данной таблице можно просмотреть и отредактировать все
            существующие льготы, а также создать новые
          </p>
        </div>
        <Button
          variant="primary"
          size="large"
          onClick={handleCreateBenefitClick}
        >
          Создать льготу
        </Button>
      </div>

      {/* <table></table> */}
      <table className={classNames(cls.ordersTable, {}, [className])}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Категория</th>
            <th>Дата создания</th>
            <th>Стоимость</th>
          </tr>
        </thead>
        <tbody>
          {myBenefits?.map((benefit) => (
            <tr key={benefit.id}>
              <td>{benefit.title}</td>
              <td>{benefit.category.title}</td>

              <td>{benefit.createdAt || "-"}</td>
              <td>{benefit.price} U</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isBenefitModalVisible &&
        createPortal(
          <CreateBenefitModal onClose={handleOnCloseClick} />,
          document.getElementById("create-benefit-modal")
        )}
    </div>
  );
};

export default MyBenefitsPage;
