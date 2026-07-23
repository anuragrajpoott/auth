import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { registerUser } from "../features/auth/authApi";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);

      toast.success(
        response.message || "Registration successful. Please verify your email."
      );

      navigate("/verify-email", {
        replace: true,
        state: { email: data.email },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="page-container">
      <Card
        title="Create Account"
        description="Create your account to get started."
        footer={
          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 transition hover:text-blue-700"
            >
              Sign In
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
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.name?.message}
            {...register("name", {
              required: "Full name is required.",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters.",
              },
            })}
          />

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
            placeholder="Create a password"
            error={errors.password?.message}
            helperText="Use at least 8 characters with uppercase, lowercase, number and special character."
            {...register("password", {
              required: "Password is required.",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
                message:
                  "Password must contain uppercase, lowercase, number and special character.",
              },
            })}
          />

          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting}
          >
            Create Account
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Register;