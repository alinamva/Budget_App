//react imports
import { useEffect, useRef } from "react";
//rrd imports
import { useFetcher } from "react-router-dom";
//library imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

const AddBudgetForms = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isSubmitting && formRef.current) {
      formRef.current.reset();
    }
  }, [isSubmitting]);
  return (
    <div className="rounded-2xl shadow-lg w-2/4 p-4">
      <div className="flex flex-col border border-dotted border-black w-full rounded-2xl p-5 gap-3">
        <h2>Create Budget</h2>
        <fetcher.Form
          method="post"
          ref={formRef}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="newBudget">Budget Name</label>
            <input
              className="border focus:outline-cyan-400 border-black rounded p-2"
              type="text"
              name="newBudget"
              id="newBudget"
              placeholder="e.g., Groceries"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="newBudgetAmount">Budget Name</label>
            <input
              className="border border-black focus:outline-cyan-400 rounded p-2"
              type="number"
              step="0.01"
              name="newBudgetAmount"
              id="newBudgetAmount"
              placeholder="e.g., $350"
              required
              inputMode="decimal"
              disabled={isSubmitting}
            />
            <input type="hidden" name="_action" value="createBudget" />
          </div>
          <button type="submit" className="btn-dark">
            {isSubmitting ? (
              <span>Submitting..</span>
            ) : (
              <>
                <span>Create budget</span>
                <CurrencyDollarIcon width={20} />
              </>
            )}
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
};

export default AddBudgetForms;
