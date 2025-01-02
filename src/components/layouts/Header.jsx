import { Link, useNavigate } from "react-router";
import useAuth from "../../features/auth/useAuth";
import { FaRegUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const Header = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOutUser().then(() => {
      toast.success("Sign out successful.");
      navigate("/sign-in");
    });
  };
  return (
    <div className="navbar bg-base-100 container mx-auto px-2 lg:p-0 mt-3">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className=" lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2"
          >
            <li>
              <Link className="btn btn-sm" to={"/"}>
                Home
              </Link>
            </li>

            <li>
              <Link className="btn btn-sm" to={"/"}>
                All Jobs
              </Link>
            </li>

            {!user && (
              <>
                <li>
                  <Link className="btn btn-sm" to={"/sign-in"}>
                    Sign In
                  </Link>
                </li>

                <li>
                  <Link className="btn btn-sm" to={"/sign-up"}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link to={"/"} className=" ml-2 lg:ml-0 font-semibold text-xl">
          JobCrafter
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <li>
            <Link className="btn btn-sm" to={"/"}>
              Home
            </Link>
          </li>

          <li>
            <Link className="btn btn-sm" to={"/"}>
              All Jobs
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {!user && (
          <div className="hidden lg:flex">
            <Link to={"/sign-in"} className="btn btn-sm mr-3">
              Sign In
            </Link>
            <Link to={"/sign-up"} className="btn btn-sm  mr-3">
              Sign Up
            </Link>
          </div>
        )}
        {user && (
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full" title={user?.displayName}>
                  {user?.photoURL ? (
                    <img
                      referrerPolicy="no-referrer"
                      className="w-10 rounded-full border border-black"
                      src={user?.photoURL}
                      alt="Users Photo"
                    />
                  ) : (
                    <FaRegUserCircle size={40} />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2"
              >
                <li>
                  <Link className="btn btn-sm">Add Job</Link>
                </li>
                <li>
                  <Link className="btn btn-sm">My Posted Jobs</Link>
                </li>
                <li>
                  <Link className="btn btn-sm">My Bids</Link>
                </li>
                <li>
                  <Link className="btn btn-sm">Bid Requests</Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="btn btn-sm">
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
