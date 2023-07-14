//rrd imports
import { Form, Link } from "react-router-dom";
//library imports

import { BanknotesIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
//helper functions
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "./Helpers";

export interface Budget {
  id: string;
  name: string;
  amount: number;
  createdAt: number;
}

export interface BudgetItemProps {
  budget: Budget;
  showDelete?: boolean;
}

const BudgetItem = ({ budget, showDelete = false }: BudgetItemProps) => {
  const { id, name, amount } = budget || { id: 0, name: "", amount: 0 };
  const colors: string[] = [
    "border border-orange-400 text-orange-700",
    "border border-blue-400 text-blue-700",
    "border border-green-400 text-green-700",
    "border border-yellow-400 text-yellow-700",
    "border border-emerald-400 text-emerald-700",
    "border border-cyan-400 text-cyan-700",
    "border border-indigo-400 text-indigo-700",
    "border border-pink-400 text-pink-700",
    "border border-rose-400 text-rose-700",
    "border border-violet-400 text-violet-700",
    "border border-sky-400 text-sky-700",
    "border border-teal-400 text-teal-700",
    "border border-slate-400 text-slate-700",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const spent = calculateSpentByBudget({ budgetId: id });
  return (
    <div className={`flex flex-col gap-3 ${randomColor} rounded-xl p-4`}>
      <div className="flex justify-between items-center gap-2">
        <h3>{name}</h3>
        <p className="text-right">{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="flex justify-between gap-2">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      {showDelete ? (
        <div>
          {" "}
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Are you sure you want to permanently delete this budget?"
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <div className="flex justify-center">
              <button type="submit" className="btn-delete">
                <span>Delete Budget</span>
                <TrashIcon width={20} />
              </button>
            </div>
          </Form>
        </div>
      ) : (
        <div className="flex justify-center hover:border hover:bg-slate-200">
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
