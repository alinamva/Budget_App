//rrd imports
import { Link, useFetcher } from "react-router-dom";
// helper functions
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMAtchingItems,
} from "./Helpers";
//library imports
import { TrashIcon } from "@heroicons/react/24/solid";

export interface Expense {
  id: string;
  name: string;
  amount: number;
  createdAt: number;
  budgetId: number;
}
export interface ExpenseItemProps {
  expense: Expense;
  showBudget: boolean;
}

const ExpenseItem = ({ expense, showBudget }: ExpenseItemProps) => {
  const fetcher = useFetcher();

  const budget = getAllMAtchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link className="btn bg-slate-400" to={`/budget/${budget.id}`}>
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            className="btn-delete"
            type="submit"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
