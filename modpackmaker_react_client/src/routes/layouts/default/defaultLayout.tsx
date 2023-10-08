import { Outlet } from "react-router-dom";
import Navbar from "./navbar/navbar";

export default function DefaultLayout() {
    return (
      <>
        <div className="flex flex-col h-full gap-4">
          <Navbar /> 
        <div className="flex-auto mt-0 overflow-y-auto md:mt-2">
          <Outlet />
        </div>
        </div>
      </>
    );
}