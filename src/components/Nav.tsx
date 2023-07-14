//rrd imports
import { Form, NavLink } from "react-router-dom";
//asset imports
import logomark from "../assets/logomark.svg";
//library imports
import { TrashIcon } from "@heroicons/react/24/solid";
//component imports
import { IMain } from "../layouts/Main";

const Nav = ({ userName }: IMain) => {
  return (
    <nav className="flex justify-between p-7 gap-3 ">
      <NavLink to="/" aria-label="go to home">
        <button className=" flex p-2 rounded-3xl gap-2">
          <img src={logomark} />
          <span className=" text-lg">HomeBudget</span>
        </button>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(event) => {
            if (!confirm("Delete all user and data")) {
              event?.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn-delete">
            <TrashIcon width={20} />
            <span className="text-xs sm:text-base">Delete user</span>
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Nav;
