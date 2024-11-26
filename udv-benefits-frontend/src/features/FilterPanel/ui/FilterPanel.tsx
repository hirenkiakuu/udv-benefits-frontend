import cls from "./FilterPanel.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import Home from "shared/assets/icons/home.svg";
import Health from "shared/assets/icons/health.svg";
import Book from "shared/assets/icons/book.svg";
import Sport from "shared/assets/icons/sport.svg";
import Transport from "shared/assets/icons/transport.svg";
import Food from "shared/assets/icons/food.svg";
import Giftcard from "shared/assets/icons/giftcard.svg";
import FilterButton from "features/FilterButton";
import { memo } from "react";

interface FilterPanelProps {
  className?: string;
  currentBenefitsCategory: string;
  onBenefitCategoryChange: (benefitsCategory: string) => void;
}

const FilterPanel = ({
  className,
  currentBenefitsCategory,
  onBenefitCategoryChange,
}: FilterPanelProps) => {
  return (
    <div className={classNames(cls.filterPanel, {}, [className])}>
      <ul className={cls.filterOptions}>
        <li>
          <FilterButton
            isActive={currentBenefitsCategory === "all"}
            onClick={() => onBenefitCategoryChange("all")}
          >
            <Home width="18px" height="20px" />
            Все
          </FilterButton>
        </li>
        <li>
          <FilterButton
            isActive={currentBenefitsCategory === "health"}
            onClick={() => onBenefitCategoryChange("health")}
          >
            <Health width="18px" height="20px" />
            Здоровье
          </FilterButton>
        </li>
        <li>
          <FilterButton
            isActive={currentBenefitsCategory === "education"}
            onClick={() => onBenefitCategoryChange("education")}
          >
            <Book width="18px" height="20px" />
            Образование
          </FilterButton>
        </li>
        <li>
          <FilterButton
            isActive={currentBenefitsCategory === "sport"}
            onClick={() => onBenefitCategoryChange("sport")}
          >
            <Sport width="18px" height="20px" />
            Спорт
          </FilterButton>
        </li>
        <li>
          <FilterButton
            isActive={currentBenefitsCategory === "transport"}
            onClick={() => onBenefitCategoryChange("transport")}
          >
            <Transport />
            Перемещение
          </FilterButton>
        </li>
        <li>
          <FilterButton
            isActive={currentBenefitsCategory === "food"}
            onClick={() => onBenefitCategoryChange("food")}
          >
            <Food />
            Питание
          </FilterButton>
        </li>
        <li>
          <FilterButton
            isActive={currentBenefitsCategory === "giftcard"}
            onClick={() => onBenefitCategoryChange("giftcard")}
          >
            <Giftcard />
            Подарочные карты
          </FilterButton>
        </li>
      </ul>
    </div>
  );
};

export default memo(FilterPanel);
