import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { forgotPassword } from "../features/auth/authApi";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

const emailValidation = {
  required: "Email is required.",
  pattern: {
    value: /^\S+@\S+\.\S+$/,
    message: "Please enter a valid email address.",
  },
};

function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await forgotPassword(data);

      toast.success(
        response.message || "Password reset OTP sent successfully."
      );

      navigate("/verify-reset-otp", {
        replace: true,
        state: {
          email: data.email,
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="page-container">
      <Card
        title="Forgot Password"
        description="Enter your email address to receive a password reset OTP."
        footer={
          <p className="text-center text-sm text-slate-600">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 transition hover:text-blue-700"
            >
              Back to Login
            </Link>
          </p>
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          aria-label="Forgot password form"
          noValidate
        >
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email", emailValidation)}
          />

          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting}
          >
            Send OTP
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default ForgotPassword;