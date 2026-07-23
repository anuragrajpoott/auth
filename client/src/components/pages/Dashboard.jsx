import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">
          Welcome
        </h1>

        <p className="mt-2 text-slate-600">
          Unable to load your profile information.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome, {user.name} 👋
        </h1>

        <p className="mt-2 text-slate-600">
          You have successfully logged in to your account.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Account Information
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-sm text-slate-500">Name</p>
              <p className="font-medium text-slate-900">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-medium text-slate-900">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Role</p>
              <p className="font-medium text-slate-900">
                {user.role}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Email Status
              </p>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                  user.isVerified
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {user.isVerified ? "Verified" : "Pending"}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Manage your account settings and security.
          </p>

          <div className="mt-6">
            <Link
              to="/profile"
              className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Go to Profile
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;