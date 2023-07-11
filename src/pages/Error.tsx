//rrd imports
import { useRouteError, Link, useNavigate } from "react-router-dom";
//library imports
import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid";

type ErrorType = {
  message: string;
  textStatus: string;
};
const Error = () => {
  const error = useRouteError() as ErrorType;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <h1>Uh oh, We've got a problem!</h1>
      <p>{error.message || error.textStatus}</p>
      <div className="flex gap-3">
        <button className="btn-dark" onClick={() => navigate(-1)}>
          <ArrowUturnLeftIcon width={20} />
          <span>Go back</span>
        </button>
        <Link to="/" className="btn-dark">
          <HomeIcon width={20} />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Error;
