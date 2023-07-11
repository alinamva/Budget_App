//rrd imports
import { Outlet } from "react-router-dom";
// assets import
import wave from "../assets/wave.svg";
//helper functions
import { fetchData } from "../components/Helpers";
//component imports
import Nav from "../components/Nav";

interface IDashboard {
  userName: string;
}
export function mainLoader(): IDashboard {
  const userName: string = fetchData("userName");
  return { userName };
}

const Main = () => {
  const dashboardData: IDashboard = mainLoader();
  return (
    <div className="min-h-screen flex flex-col justify-between gap-10">
      <Nav userName={dashboardData} />

      <main className="px-12">
        <Outlet />
      </main>
      <div>
        <img src={wave} alt="wave" />
      </div>
    </div>
  );
};

export default Main;
