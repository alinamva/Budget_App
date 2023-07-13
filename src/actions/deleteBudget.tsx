//rrd imports
import { redirect } from "react-router-dom";
//library imports
import { toast } from "react-toastify";
import { Expense } from "../components/ExpenseItem";
//helper functions
import { deleteItem, getAllMAtchingItems } from "../components/Helpers";

export interface IDeleteBudget {
  id: number;
}

export interface deleteBudgetProps {
  params: IDeleteBudget;
  expense: Expense[];
}

export default function deleteBudget({ params }: deleteBudgetProps) {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const assosiatedExpenses: Expense[] = getAllMAtchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });
    assosiatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });
    toast.success("Budget deleted successfully!");
  } catch (e) {
    throw new Error("There was a problem deleting your budget!");
  }
  return redirect("/");
}
