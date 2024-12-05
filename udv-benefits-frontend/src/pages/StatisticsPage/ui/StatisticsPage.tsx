import { Heading } from "shared/ui";
import cls from "./StatisticsPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import api from "shared/api/api";
import { useEffect, useState } from "react";

interface Statistics {
  activeBenefits: number;
  totalBenefits: number;
  totalUsers: number;
  popularBenefit: {
    id: number;
    title: string;
    provider: string;
    description: string;
    picture: string;
    price: number;
    requiredExperience: string;
    childsRequired: boolean;
    categoryId: number;
    isActive: boolean;
    createdAt: string;
    category: {
      title: string;
      id: number;
      icon: string;
    };
  };
  categoryStatistics: [
    {
      category: {
        title: string;
        id: number;
        icon: string;
      };
      activeBenefits: number;
    },
  ];
}

interface StatisticsCardProps {
  statTitle: string;
  statData: string | number;
  small?: boolean;
  className?: string;
}

const StatisticsCard = ({
  statTitle,
  small,
  statData,
}: StatisticsCardProps) => {
  return (
    <div className={cls.statisticsCard}>
      <p className={cls.statisticsTitle}>{statTitle}</p>
      {small ? (
        <p className={cls.statisticsRateSmall}>{statData}</p>
      ) : (
        <p className={cls.statisticsRate}>{statData}</p>
      )}
    </div>
  );
};

interface StatisticsPageProps {
  className?: string;
}

const StatisticsPage = ({ className }: StatisticsPageProps) => {
  const [statistics, setStatistics] = useState<Statistics>();

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const res = await api.get("/api/statistics");

        if (res) {
          const { data } = res;
          setStatistics(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getStatistics();
  }, []);

  return (
    <div className={classNames(cls.statisticsPage, {}, [className])}>
      <div className={cls.statisticsPageContainerInner}>
        <div className={cls.statisticsRow}>
          <div className={cls.statisticsRowTitle}>
            <Heading>Общая статистика</Heading>
            <a
              href="https://metrika.yandex.ru/dashboard?id=99127994"
              target="_blank"
              className={cls.showMoreButton}
              rel="noreferrer"
            >
              <button>Подробнее</button>
            </a>
          </div>

          <div className={cls.cardsContainer}>
            <StatisticsCard
              statTitle="Количество активных льгот"
              statData={statistics?.activeBenefits}
            />
            <StatisticsCard
              statTitle="Количество сотрудников"
              statData={statistics?.totalUsers}
            />
            <StatisticsCard
              statTitle="Всего льгот (включая неактивные)"
              statData={statistics?.totalBenefits}
            />
            <StatisticsCard
              statTitle="Самая популярная льгота"
              small={true}
              statData={statistics?.popularBenefit?.title || "Нет данных"}
            />
          </div>
        </div>
        <div className={cls.statisticsRow}>
          <Heading>Активные льготы по категориям</Heading>
          <div className={cls.categoriesCardsContainer}>
            {statistics?.categoryStatistics.map((stat) => (
              <StatisticsCard
                key={stat.category.id}
                statTitle={stat.category.title}
                statData={stat.activeBenefits}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
