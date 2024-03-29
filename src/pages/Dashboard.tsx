//rrd imports
import { Link, useLoaderData } from "react-router-dom";
// import components
import Intro from "../components/Intro";
import AddBudgetForms from "../components/AddBudgetForms";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem, { Budget } from "../components/BudgetItem";
import Table from "../components/Table";
import { Expense } from "../components/ExpenseItem";
// helper functions
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
} from "../components/Helpers";
//library imports
import { toast } from "react-toastify";

export interface IDashboard {
  userName: string;
  budgets: Budget[];
  expenses: Expense[];
}
//loader
export function dashBoardLoader(): IDashboard {
  const userName: string = fetchData("userName");
  const budgets: Budget[] = fetchData("budgets");
  const expenses: Expense[] = fetchData("expenses");

  return { userName, budgets, expenses };
}

//action
export async function dashboardAction({ request }: { request: Request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account");
    }
  }
  if (_action === "createBudget") {
    try {
      createBudget({
        name: values?.newBudget as string,
        amount: Number(values.newBudgetAmount),
      });
      return toast.success("Budget created!");
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
    }
  }
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values?.newExpense as string,
        amount: Number(values.newExpenseAmount),
        budgetId: values?.newExpenseBudget as string,
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

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData() as IDashboard;
  return (
    <div>
      {userName ? (
        <div className="flex flex-col gap-3">
          <h1>
            Welcome back, <span className="text-cyan-400">{userName}</span>
          </h1>

          {budgets && budgets.length > 0 ? (
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap ">
                <AddBudgetForms />
                <AddExpenseForm budgets={budgets} />
              </div>
              <h2 className="text-red">Existing Budgets</h2>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                {budgets.map((budget) => (
                  <BudgetItem key={budget.id} budget={budget} />
                ))}
              </div>
              {expenses && expenses.length > 0 && (
                <div>
                  <h2>Recent Expenses</h2>
                  <Table
                    expenses={expenses
                      .sort((a, b) => b.createdAt - a.createdAt)
                      .slice(0, 8)}
                  />
                  {expenses.length > 8 && (
                    <Link to="expenses" className="btn-dark">
                      View all expenses
                    </Link>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
              </div>
              <AddBudgetForms />
            </div>
          )}
        </div>
      ) : (
        <Intro />
      )}
    </div>
  );
};

export default Dashboard;
