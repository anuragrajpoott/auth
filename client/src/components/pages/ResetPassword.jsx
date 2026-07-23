import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { resetPassword } from "../features/auth/authApi";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: location.state?.email || "",
      otp: location.state?.otp || "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async ({
    email,
    otp,
    newPassword,
  }) => {
    try {
      const response = await resetPassword({
        email,
        otp,
        newPassword,
      });

      toast.success(
        response.message || "Password reset successfully."
      );

      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="page-container">
      <Card
        title="Reset Password"
        description="Create a new password for your account."
        footer={
          <p className="text-center text-sm text-slate-600">
            Back to{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Login
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

          <Input
            label="OTP"
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            error={errors.otp?.message}
            {...register("otp", {
              required: "OTP is required.",
              pattern: {
                value: /^\d{6}$/,
                message: "OTP must be exactly 6 digits.",
              },
            })}
          />

          <PasswordInput
            label="New Password"
            placeholder="Enter your new password"
            helperText="Must contain at least 8 characters, including uppercase, lowercase, number and special character."
            error={errors.newPassword?.message}
            {...register("newPassword", {
              required: "New password is required.",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
                message:
                  "Password must contain uppercase, lowercase, number and special character.",
              },
            })}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your new password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Please confirm your password.",
              validate: (value) =>
                value === newPassword || "Passwords do not match.",
            })}
          />

          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting}
          >
            Reset Password
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default ResetPassword;