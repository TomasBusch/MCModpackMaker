import { Outlet } from "react-router-dom";
import Navbar from "./navbar/navbar";

export default function DefaultLayout() {
    return (
      <>
        <div className="flex flex-col h-full gap-4">
          <Navbar /> 
        <div className="flex-auto px-2 mt-0 overflow-y-auto md:px-0 md:mt-2">
          <Outlet />
        </div>
        </div>
      </>
    );
}