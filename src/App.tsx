//rrd
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//layouts
import Main, { mainLoader } from "./layouts/Main";
//routes
import Dashboard, { dashboardAction, dashBoardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import ExpensesPage, {
  ExpensesAction,
  expensesLoader,
} from "./pages/ExpensesPage";
//library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//actions
import { logoutAction } from "./actions/logout";
import BudgetPage, { BudgetAction, budgetLoader } from "./pages/BudgetPage";
import deleteBudget from "./actions/deleteBudget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashBoardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: ExpensesAction,
        errorElement: <Error />,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: () => budgetLoader,
        action: BudgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: () => deleteBudget,
          },
        ],
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
