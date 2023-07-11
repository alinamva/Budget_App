//rrd imports
import { Form } from "react-router-dom";
//library imports
import { UserPlusIcon } from "@heroicons/react/24/solid";
//import assets
import illustration from "../assets/illustration.jpg";

const Intro = () => {
  return (
    <div className="justify-center gap-3 xl:gap-48 items-center flex flex-col xl:flex-row xl:justify-between">
      <div className=" w-100 flex flex-col  justify-center gap-3">
        <h1 className="font-bold text-5xl   ">
          Take Control of <span className="text-cyan-400">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your
          journey today.
        </p>
        <Form method="post" className="flex flex-col max-w-[300px] gap-3">
          <input
            className="border border-black p-2 rounded"
            type="text"
            name="userName"
            required
            placeholder="What is your name?"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />

          <button type="submit" className="btn-dark">
            <span>Create Account</span> <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={illustration} alt="illustration" width={600} />
    </div>
  );
};

export default Intro;
