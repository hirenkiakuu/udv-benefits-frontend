import api from "shared/api/api";
import cls from "./MyBenefitsPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, Heading, Table } from "shared/ui";
import { useEffect, useMemo, useState } from "react";
import { Benefit } from "entities/benefit.model";
import { createPortal } from "react-dom";
import CreateBenefitModal from "widgets/CreateBenefitModal";
import { ColumnsConfig } from "shared/ui/Table/model/table.config";
import { formatToLocalDate } from "shared/lib/formatters/formatDate";

interface MyBenefitsPageProps {
  className?: string;
}

const MyBenefitsPage = ({ className }: MyBenefitsPageProps) => {
  const [myBenefits, setMyBenefits] = useState<Benefit[]>();
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

  const editBenefitClick = (id: number) => {
    console.log(id);
    console.log("---");
  };

  const columnsConfig: ColumnsConfig<Benefit> = useMemo(
    // подумать как это вынести вне компонента
    () => [
      {
        header: "Название",
        render: (benefit) => benefit.title,
      },
      {
        header: "Категория",
        render: (benefit) => benefit.category.title,
      },
      {
        header: "Дата создания",
        render: (benefit) => formatToLocalDate(benefit.createdAt), // поменять
      },
      {
        header: "Стоимость",
        render: (benefit) => `${benefit.price} U`,
      },
      {
        header: "",
        render: (benefit) => (
          <Button size="large" onClick={() => editBenefitClick(benefit.id)}>
            редактировать
          </Button>
        ),
      },
    ],
    []
  );

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

      <Table tableData={myBenefits} columnsConfig={columnsConfig} />

      {isBenefitModalVisible &&
        createPortal(
          <CreateBenefitModal onClose={handleOnCloseClick} />,
          document.getElementById("create-benefit-modal")
        )}
    </div>
  );
};

export default MyBenefitsPage;
