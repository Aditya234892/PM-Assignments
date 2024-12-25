import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    return (
        <div className="bg-amber-900 w-full h-screen">
      <Header/>
      <Outlet/>
    </div>
    );
}

export default Layout;
