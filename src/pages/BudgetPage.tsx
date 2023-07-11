//rrd imports
import { useLoaderData } from "react-router-dom";
//library imports
import { toast } from "react-toastify";
//components
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
// helper functions
import {
  createExpense,
  deleteItem,
  getAllMAtchingItems,
} from "../components/Helpers";

//loader
export async function budgetLoader({ params }) {
  const budget = await getAllMAtchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];
  const expenses = await getAllMAtchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you're trying to find doesn't exist");
  }
  return { budget, expenses };
}

//action
export async function BudgetAction({ request }: { request: Request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

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

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  return (
    <div className="flex flex-col gap-8">
      <h2>
        <span className="accent">{budget.name} </span>Overview
      </h2>
      <div>
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div>
          <h2>
            <span className="accent">{budget.name} </span>Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
