import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { logoutUser } from "../features/auth/authApi";
import { clearUser } from "../features/auth/authSlice";

function MainLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();

      dispatch(clearUser());
      toast.success("Logged out successfully.");

      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="app-container flex h-16 items-center justify-between">
          <NavLink
            to="/dashboard"
            className="text-xl font-bold text-slate-900"
          >
            AuthFlow
          </NavLink>

          <div className="flex items-center gap-2">
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>

            <NavLink to="/profile" className={navLinkClass}>
              Profile
            </NavLink>

            <button
              type="button"
              onClick={handleLogout}
              className="focus-ring rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-container py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;