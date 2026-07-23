import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { loginUser } from "../features/auth/authApi";
import { setUser } from "../features/auth/authSlice";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";
import Button from "../components/ui/Button";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      dispatch(setUser(response.data));
      toast.success(response.message || "Login successful.");

      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="page-container">
      <Card
        title="Welcome Back"
        description="Sign in to access your account."
        footer={
          <p className="text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Create one
            </Link>
          </p>
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email address.",
              },
            })}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required.",
            })}
          />

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting}
          >
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Login;