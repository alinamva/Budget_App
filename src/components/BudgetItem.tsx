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
}

interface BudgetItemProps {
  budget: Budget;
  showDelete?: boolean;
}

const BudgetItem = ({ budget, showDelete = false }: BudgetItemProps) => {
  const { id, name, amount } = budget;
  const colors: string[] = [
    "bg-orange-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-emerald-200",
    "bg-cyan-200",
    "bg-indigo-200",
    "bg-pink-200",
    "bg-rose-200",
    "bg-violet-200",
    "bg-sky-200",
    "bg-teal-200",
    "bg-slate-200",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const spent = calculateSpentByBudget(id);
  return (
    <div className={`${randomColor} p-4 rounded-xl`}>
      <div className="flex flex-col gap-3 w-80  rounded-xl p-4">
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
          <div className="flex justify-center">
            <Link to={`/budget/${id}`} className="btn">
              <span>View Details</span>
              <BanknotesIcon width={20} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetItem;
