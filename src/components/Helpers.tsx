import { Expense } from "./ExpenseItem";
interface Helpers {
  key: string;
  category: string;
  value: string;
}
// local storage
export const fetchData = (key: string): any => {
  const item = localStorage.getItem(key);
  return item !== null ? JSON.parse(item) : null;
};

// Get all items from local storage
export const getAllMAtchingItems = ({ category, key, value }: Helpers) => {
  const data = fetchData(category) ?? [];
  return data.filter((item: any) => item[key] === value);
};

export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 2000));

// delete item from local storage
export const deleteItem = ({ key, id }: { key: string; id?: any }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item: any) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};
// create budget
export const createBudget = ({
  name,
  amount,
}: Pick<Expense, "name" | "amount">) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};
//create expense
export const createExpense = ({
  name,
  amount,
  budgetId,
}: Omit<Expense, "id" | "createdAt">) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name as string,
    createdAt: Date.now(),
    amount: amount,
    budgetId: budgetId,
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

//total spent by budget
export const calculateSpentByBudget = ({
  budgetId,
}: Pick<Expense, "budgetId">) => {
  const expenses = fetchData("expenses") ?? [];

  const filteredExpenses = expenses.filter(
    ({ budgetId: expensesBudgetId }: { budgetId: string }) =>
      expensesBudgetId === budgetId
  );

  const budgetSpent = filteredExpenses.reduce(
    (acc: number, expense: Expense) => (acc += expense.amount),
    0
  );

  return budgetSpent;
};
//FORMATTING
export const formatDateToLocaleString = (epoch: number) => {
  return new Date(epoch).toLocaleDateString();
};

//formatting percentage
export const formatPercentage = (amt: number) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};
//Format currency
export const formatCurrency = (amt: number) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};
