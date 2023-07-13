//rrd imports
import { redirect } from "react-router-dom";
//library imports
import { toast } from "react-toastify";
//helper functions
import { deleteItem } from "../components/Helpers";

export async function logoutAction() {
  //delete the user
  deleteItem({ key: "userName" });
  deleteItem({ key: "budgets" });
  deleteItem({ key: "expenses" });

  toast.success("You've deleted the account");
  //return redirect
  return redirect("/");
}
