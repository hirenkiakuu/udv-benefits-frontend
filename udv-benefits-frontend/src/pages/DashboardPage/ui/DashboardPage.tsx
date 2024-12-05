import { NavLink, Outlet } from "react-router-dom";
import cls from "./DashboardPage.module.scss";
import { classNames } from "shared/lib/classNames/classNames";

interface DashboardPageProps {
  className?: string;
}

const DashboardPage = ({ className }: DashboardPageProps) => {
  return (
    <div className={classNames(cls.dashboardPage, {}, [className])}>
      <aside>
        <nav className={cls.sidebar}>
          <ul className={cls.sidebarNavList}>
            <li className={cls.sidebarNavListItem}>
              <NavLink
                to="/hr-dashboard/my-benefits"
                className={({ isActive }) => (isActive ? cls.active : "")}
              >
                <div className={cls.navButton}>Управление льготами</div>{" "}
                {/* переделать структуру */}
              </NavLink>
            </li>
            <li className={cls.sidebarNavListItem}>
              <NavLink
                to="/hr-dashboard/orders"
                className={({ isActive }) => (isActive ? cls.active : "")}
              >
                <div className={cls.navButton}>Лента заявок</div>
              </NavLink>
            </li>
            <li className={cls.sidebarNavListItem}>
              <NavLink
                to="/hr-dashboard/employees"
                className={({ isActive }) => (isActive ? cls.active : "")}
              >
                <div className={cls.navButton}>Сотрудники</div>
              </NavLink>
            </li>
            <li className={cls.sidebarNavListItem}>
              <NavLink
                to="/hr-dashboard/statistics"
                className={({ isActive }) => (isActive ? cls.active : "")}
              >
                <div className={cls.navButton}>Статистика</div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className={cls.content}>
        <Outlet />
      </div>
      <div id="create-benefit-modal"></div>
    </div>
  );
};

export default DashboardPage;
