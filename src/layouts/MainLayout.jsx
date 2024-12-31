import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <h1>This is the main Layout!!!</h1>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
