import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Main = () => {
  return (
    <div className="container mx-auto grid grid-cols-12 gap-4 p-3">
      <Sidebar />
      <div className="col-span-9 w-full bg-indigo-50 rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
