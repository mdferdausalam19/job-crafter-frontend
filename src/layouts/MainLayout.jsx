import { Outlet } from "react-router";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

const MainLayout = () => {
  return (
    <div>
      <Header></Header>
      <div className="container mx-auto min-h-[calc(100vh-64px-188px)] px-3 lg:px-0">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
