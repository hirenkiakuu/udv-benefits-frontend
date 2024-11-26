import { BenefitsGroup } from "entities/benefit.model";
import { useEffect, useState } from "react";
import api from "shared/api/api";

export const useGroupedBenefits = () => {
  const [groupedBenefits, setGroupedBenefits] = useState<BenefitsGroup[]>([]);
  const [benefitsAvailability, setBenefitsAvailability] = useState("available");
  const [benefitsCategory, setBenefitsCategory] = useState("all");

  useEffect(() => {
    const loadGrouppedBenefits = async () => {
      try {
        const res = await api.get(
          `/api/benefits/grouped?benefit_type=${benefitsAvailability}`
        );

        if (res) {
          const { data } = res;
          setGroupedBenefits(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadGrouppedBenefits();
  }, [benefitsAvailability]);

  return {
    groupedBenefits,
    benefitsAvailability,
    setBenefitsAvailability,
    benefitsCategory,
    setBenefitsCategory,
  };
};
