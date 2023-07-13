//rrd imports
import { useLoaderData } from "react-router-dom";
//library imports
import { toast } from "react-toastify";
//helpers
import { deleteItem, fetchData } from "../components/Helpers";
//component imports
import Table from "../components/Table";
import { Expense } from "../components/ExpenseItem";
//loader

export interface ExpensesPage {
  expenses: Expense[];
}

export function expensesLoader() {
  const expenses = fetchData("expenses") as Expense[];

  return { expenses };
}
//action
export async function ExpensesAction({ request }: { request: Request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData() as ExpensesPage;

  return (
    <div>
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div>
          <h2>
            Recent Expenses <small>({expenses.length}total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p> No Expenses</p>
      )}
    </div>
  );
};

export default ExpensesPage;
