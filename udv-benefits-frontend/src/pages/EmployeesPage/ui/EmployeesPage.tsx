import { Heading } from "shared/ui";
import cls from "./EmployeesPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import api from "shared/api/api";
import { useEffect, useState } from "react";
// import ExpandingTable from "features/ExpandingTable";
import { TableRow } from "features/ExpandingTable/ui/ExpandingTable";

import EditUserModal from "widgets/EditUserModal";

interface EmployeesPageProps {
  className?: string;
}

// interface UserData {
//   id: number;
//   firstName: string;
//   middleName: string;
//   lastName: string;
// }

// const prepareTableData = (user) => {};

interface User {
  email: string;
  phone: string;
  birthDate: string;
  hasChildren: boolean;
  position?: string;
  department?: string;
  isAdmin: boolean;
  workStartDate: string;
  workEndDate: string;
  balance: string;
  workExperience: {
    months: string; // Change this to string if necessary
    years: string; // Change this to string if necessary
  };
}

interface User {
  email: string;
  phone: string;
  birthDate: string;
  hasChildren: boolean;
  position?: string;
  department?: string;
  isAdmin: boolean;
  workStartDate: string;
  workEndDate: string;
  balance: string;
  workExperience: {
    months: string; // Change this to string if necessary
    years: string; // Change this to string if necessary
  };
}

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  user: User; // Добавляем поле user
  isVerified: boolean;
  status: "approved" | "rejected" | "in_work"; // Adjust as per your needs
  workExperience: {
    months: string;
    years: string;
  };
  email: string;
  phone: string;
  birthDate: string;
  hasChildren: boolean;
  position: string;
  department: string;
  isAdmin: boolean;
  workStartDate: string;
  workEndDate: string;
  balance: number;
}

const EmployeesPage = ({ className }: EmployeesPageProps) => {
  const [users, setUsers] = useState<UserData[]>();
  const [currentEditId, setCurrentEditId] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = (userId: number) => {
    setCurrentEditId(userId);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleUserUpdate = (updatedUser: UserData) => {
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

      <table className={classNames(cls.expandingTable, {}, [className])}>
        <thead>
          <th>ФИО</th>
          <th></th>
          <th></th>
          <th></th>
        </thead>
        <tbody>
          {users?.map((item, index) => (
            // {console.log(item)}
            <TableRow
              key={index}
              data={item}
              tempMode={true}
              onEdit={handleOpenModal}
              onAccept={handleAcceptClick}
            />
          ))}
        </tbody>
      </table>

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
