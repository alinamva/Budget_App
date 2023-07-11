//componrnts import
import ExpenseItem, { Expense } from "./ExpenseItem";

interface ExpensesProps {
  expenses: Expense[];
  showBudget?: boolean;
}

const Table = ({ expenses, showBudget = true }: ExpensesProps) => {
  return (
    <div className="container mx-auto">
      <table className="w-3/4 bg-white border-collapse">
        <thead>
          <tr>
            {["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map(
              (i, index) => (
                <th className="py-2 border-b text-left" key={index}>
                  {i}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <ExpenseItem expense={expense} showBudget={showBudget} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
