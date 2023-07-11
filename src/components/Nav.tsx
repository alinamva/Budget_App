//rrd imports
import { Form, NavLink } from "react-router-dom";
//asset imports
import logomark from "../assets/logomark.svg";
import { IDashboard } from "../pages/Dashboard";
//library imports
import { TrashIcon } from "@heroicons/react/24/solid";
interface INav {
  userName: IDashboard;
}

const Nav: React.FC<INav> = ({ userName }) => {
  return (
    <nav className="flex justify-between p-7">
      <NavLink to="/" aria-label="go to home">
        <button className=" flex p-2 rounded-3xl">
          <img src={logomark} />
          <span>HomeBudget</span>
        </button>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(event) => {
            if (!confirm("Delete all user and data")) {
              event?.preventDefault;
            }
          }}
        >
          <button type="submit" className="btn-delete">
            <TrashIcon width={20} />
            <span>Delete user</span>
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Nav;
