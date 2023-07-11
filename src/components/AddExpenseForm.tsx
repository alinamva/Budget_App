//react imports
import { useEffect, useRef } from "react";
//rrd imports
import { useFetcher } from "react-router-dom";
//library imports
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const formRef = useRef();
  const focusRef = useRef();
  const isSubmitting = fetcher.state === "submitting";
  useEffect(() => {
    if (!isSubmitting) {
      //clear form
      formRef.current.reset();
      //reset focus
      formRef.current.focus();
    }
  });
  return (
    <div className="rounded-2xl shadow-lg w-2/4 p-4">
      <div className="flex flex-col border border-dotted border-black w-full rounded-2xl p-5 gap-3">
        <h2>
          Add new{" "}
          <span className="text-cyan-400">
            {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
          </span>{" "}
          Expense
        </h2>
        <fetcher.Form
          method="post"
          ref={formRef}
          className="flex flex-col gap-3"
        >
          {" "}
          <div className="flex flex-col gap-2">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              className="border focus:outline-cyan-400 border-black rounded p-2"
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffee"
              required
              ref={focusRef}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              className="border focus:outline-cyan-400 border-black rounded p-2"
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              placeholder="e.g., 3.5"
              required
            />
          </div>
          <div className="flex flex-col gap-3" hidden={budgets.length === 1}>
            <label htmlFor="newExpenseBudget">Budget category</label>
            <select
              className="border focus:outline-cyan-400 border-black rounded p-2"
              name="newExpenseBudget"
              id="newExpenseBudget"
              required
            >
              {budgets
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((budget) => {
                  return (
                    <option key={budget.id} value={budget.id}>
                      {budget.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <input type="hidden" name="_action" value="createExpense" />
          <button type="submit" className="btn-dark">
            {isSubmitting ? (
              <span>Submitting..</span>
            ) : (
              <>
                <span>Add Expense</span>
                <PlusCircleIcon width={20} />
              </>
            )}
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
};

export default AddExpenseForm;
