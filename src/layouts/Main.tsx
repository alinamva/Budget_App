//rrd imports
import { Outlet } from "react-router-dom";
// assets import
import wave from "../assets/wave.svg";
//helper functions
import { fetchData } from "../components/Helpers";
//component imports
import Nav from "../components/Nav";

export interface IMain {
  userName?: string;
}
export function mainLoader(): IMain {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = mainLoader();
  return (
    <div className="min-h-screen flex flex-col justify-between gap-10">
      <Nav userName={userName} />

      <main className="lg:px-12 px-8">
        <Outlet />
      </main>
      <div>
        <img src={wave} alt="wave" />
      </div>
    </div>
  );
};

export default Main;
