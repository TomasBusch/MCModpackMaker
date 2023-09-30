import { Outlet } from "react-router-dom";
import MCNavbar from "./navbar/mcnavbar";

export default function DefaultLayout() {
    return (
      <div>
        <MCNavbar />
            {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
        <Outlet />
      </div>
    );
}