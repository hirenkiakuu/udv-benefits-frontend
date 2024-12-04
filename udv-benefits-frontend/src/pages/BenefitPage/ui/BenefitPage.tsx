import { NavLink, useParams } from "react-router-dom";
import cls from "./BenefitPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { useEffect, useState } from "react";
import api from "shared/api/api";
import { Benefit } from "entities/benefit.model";
import { Button, Heading } from "shared/ui";
import Arrow from "shared/assets/icons/arrow.svg";
import { RootState } from "app/providers/store/store";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "app/providers/store/user.slice";

const formatPeriod = (period: string) => {
  if (period === "one_month") return "1 месяц";
  else if (period === "three_months") return "3 месяца";
  else return "1 год";
};

interface BenefitPageProps {
  className?: string;
}

const BenefitPage = ({ className }: BenefitPageProps) => {
  const [benefit, setBenefit] = useState<Benefit>();
  const [displayableOption, setDisplayableOption] = useState(0);
  const [chosenOptionId, setChosenOptionId] = useState<number | null>(null);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { balance } = useSelector((s: RootState) => s.user.userProfile);

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
        benefitId: id,
        optionId: chosenOptionId,
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
      <div className={cls.benefitPageContainerInner}>
        <NavLink className={cls.backButton} to="/benefits">
          <Arrow width="24px" height="24px" />
        </NavLink>
        <div className={cls.benefitImg}>
          <img
            src={benefit?.picture}
            className={cls.benefitImg}
            alt="Изображение льготы"
          />
        </div>
        <div className={cls.benefitInfo}>
          <div className={cls.benefitTitle}>
            <Heading>{benefit?.title}</Heading>
            <p>{benefit?.provider}</p>
          </div>

          <div className={cls.benefitDescription}>
            <div
              dangerouslySetInnerHTML={{ __html: benefit?.description }}
            ></div>
            <p className={cls.benefitPeriod}>
              <b>Срок действия: {formatPeriod(benefit?.period)}</b>
            </p>
          </div>

          {benefit?.options.length !== 0 && (
            <div className={cls.benefitOptionsContainer}>
              <ul className={cls.benefitOptionsList}>
                {benefit?.options.map((option, index) => (
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
                  __html: benefit?.options[displayableOption]?.description,
                }}
              ></div>
            </div>
          )}

          <Heading className={cls.instructionHeader} size="medium">
            Инструкция по активации
          </Heading>
          <div
            dangerouslySetInnerHTML={{
              __html: benefit?.content.instructions,
            }}
          ></div>
        </div>

        <div className={cls.benefitPurchase}>
          <Heading className={cls.benefitPrice} size="medium">
            {benefit?.price} U-points
          </Heading>
          <div>
            <ul className={cls.benefitOptionsButtonList}>
              {benefit?.options.map((option) => (
                <li key={option.id}>
                  <button
                    className={classNames(
                      cls.benefitOptionsButton,
                      { [cls.active]: option.id === chosenOptionId },
                      []
                    )}
                    onClick={() => setChosenOptionId(option.id)}
                    disabled={Boolean(option.requiredCondition)}
                  >
                    {option.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Button
            variant="primary"
            size="large"
            className={cls.purchaseButton}
            onClick={handleBuyButtonClick}
            disabled={balance < benefit?.price}
          >
            {balance < benefit?.price ? "Недостаточно U-points" : "Приобрести"}
          </Button>
          <div className={cls.requiredConditions}>
            <ul className={cls.benefitOptionsButtonList}>
              {benefit?.options.map((option) => (
                <li key={option.id}>
                  <p className={cls.requiredCondition}>
                    {option.requiredCondition}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitPage;
