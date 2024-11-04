import { NavLink, useParams } from "react-router-dom";
import cls from "./BenefitPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { useEffect, useState } from "react";
import api from "shared/api/api";
import { Benefit } from "entities/benefit.model";
import { Button, Heading } from "shared/ui";
import Arrow from "shared/assets/icons/arrow.svg";
import BenefitPlaceholder from "shared/assets/images/benefit-placeholder.png";
import { RootState } from "app/providers/store/store";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "app/providers/store/user.slice";

interface BenefitPageProps {
  className?: string;
}

const BenefitPage = ({ className }: BenefitPageProps) => {
  const [benefit, setBenefit] = useState<Benefit>();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { id: userId } = useSelector((s: RootState) => s.user.userProfile);

  useEffect(() => {
    const getBenefit = async () => {
      try {
        const res = await api.get(`api/benefits/${id}`);

        if (res) {
          const { data } = res;
          setBenefit(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getBenefit();
  }, []);

  const handleBuyButtonClick = async () => {
    try {
      const res = await api.post("/api/orders", {
        userId,
        benefitId: id,
      });

      if (res) {
        console.log(res.data);
        dispatch(userActions.decreaseBalance(benefit.price));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classNames(cls.benefitPage, {}, [className])}>
      <div className={cls.benefitInfo}>
        <div className={cls.benefitPageContainerInner}>
          <div className={cls.benefitInfo}>
            <div className={cls.benefitPageHeader}>
              <NavLink className={cls.backButton} to="/benefits">
                <Arrow width="24px" height="24px" />
              </NavLink>
              <img
                src={BenefitPlaceholder}
                className={cls.benefitImg}
                alt="Изображение льготы"
              />
              <div className={cls.benefitTitle}>
                <Heading>{benefit?.title}</Heading>
                <Heading size="medium">{benefit?.price} U</Heading>
              </div>
            </div>
            <p>Описание льготы: {benefit?.description}</p>
            <Button
              variant="primary"
              size="large"
              className={cls.buyButton}
              onClick={handleBuyButtonClick}
            >
              Приобрести
            </Button>
          </div>

          <div className={cls.instruction}>
            <Heading size="medium">Инструкция по активации:</Heading>
            <p>{benefit?.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitPage;
