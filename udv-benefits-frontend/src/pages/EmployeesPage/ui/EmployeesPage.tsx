import { Badge, Button, Heading, Table } from "shared/ui";
import cls from "./EmployeesPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import api from "shared/api/api";
import { useEffect, useMemo, useState } from "react";
import EditUserModal from "widgets/EditUserModal";
import { ColumnsConfig } from "shared/ui/Table/model/table.config";
import { User } from "entities/user.model";
import { ExpandableRowCell } from "shared/ui/Table/ui/Table";
import {
  formatDateToDot,
  formatYears,
  formatYearsAndMonths,
} from "shared/lib/formatters/formatDate";

interface EmployeesPageProps {
  className?: string;
}

const EmployeesPage = ({ className }: EmployeesPageProps) => {
  const [users, setUsers] = useState<User[]>();
  const [currentEditId, setCurrentEditId] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = (userId: number) => {
    setCurrentEditId(userId);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await api.get("/api/users");

        if (res) {
          console.log(res.data);
          const { data } = res;
          setUsers(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getEmployees();
  }, []);

  const handleAcceptClick = async (id: number) => {
    const user = users?.find((user) => user.id === id);

    console.log(user.id);

    try {
      const res = await api.patch(`/api/users/${id}/verify`, user);

      if (res) {
        console.log(res);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, isVerified: true } : user
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const columnsConfig: ColumnsConfig<User> = [
    {
      header: "ФИО",
      render: (user) => `${user.firstName} ${user.middleName} ${user.lastName}`,
    },
    {
      header: "",
      render: (user) => (
        <Button
          onClick={() => handleOpenModal(user.id)}
          variant="link"
          size="large"
        >
          Редактировать данные
        </Button>
      ),
    },
    {
      header: "Дата подачи заявки",
      render: (user) => user.lastName,
    },
    {
      header: "Статус сотрудника",
      render: (user) => <Badge status={user.isVerified} />,
    },
    {
      header: "",
      render: (user) =>
        !user.isVerified && (
          <Button
            onClick={() => handleAcceptClick(user.id)}
            variant="primary"
            size="large"
          >
            Принять сотрудника
          </Button>
        ),
    },
  ];

  const expandableRowConfig: ExpandableRowCell<User>[] = useMemo(
    () => [
      {
        render: (user) => (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            <div>
              <p>
                <b>Юридическое лицо</b>
              </p>
              <p>{user.legalEntity}</p>
            </div>

            <div>
              <p>
                <b>Подразделение</b>
              </p>
              <p>{user.department}</p>
            </div>

            <div>
              <p>
                <b>Должность</b>
              </p>
              <p>{user.position}</p>
            </div>
          </div>
        ),
      },
      {
        render: (user) => (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            <div>
              <p>
                <b>Электронная почта</b>
              </p>
              <p>{user.email}</p>
            </div>

            <div>
              <p>
                <b>Дата рождения</b>
              </p>
              <p>{formatDateToDot(user.birthDate)}</p>
            </div>

            <div>
              <p>
                <b>Возраст</b>
              </p>
              <p>{formatYears(user.age)}</p>
            </div>
          </div>
        ),
      },
      {
        render: (user) => (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            <div>
              <p>
                <b>Телефон</b>
              </p>
              <p>{user.phone}</p>
            </div>

            <div>
              <p>
                <b>Время работы в UDV</b>
              </p>
              <p>
                {formatYearsAndMonths(
                  user.workExperience.years,
                  user.workExperience.months
                )}
              </p>
            </div>

            <div>
              <p>
                <b>Есть дети</b>
              </p>
              <p>{user.hasChildren ? "Да" : "Нет"}</p>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className={classNames(cls.EmployeesPage, {}, [className])}>
      <div className={cls.pageHeader}>
        <div className={cls.pageTitle}>
          <Heading>Список сотрудников</Heading>
          <p>
            Здесь вы можете подтвердить регистрацию новых сотрудников или
            отредактировать их данные
          </p>
        </div>
      </div>

      <Table
        columnsConfig={columnsConfig}
        tableData={users}
        expandableRowConfig={expandableRowConfig}
        isExpandable={true}
      />

      {isModalVisible && (
        <EditUserModal
          onClose={handleCloseModal}
          currentUser={users?.find((user) => user.id === currentEditId)}
          onUserUpdate={handleUserUpdate}
        />
      )}
    </div>
  );
};

export default EmployeesPage;
