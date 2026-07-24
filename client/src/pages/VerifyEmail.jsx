import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  resendVerificationOtp,
  verifyEmail,
} from "../features/auth/authApi";

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

const otpValidation = {
  required: "OTP is required.",
  pattern: {
    value: /^\d{6}$/,
    message: "OTP must be exactly 6 digits.",
  },
};

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email,
      otp: "",
    },
  });

  const handleVerify = async (data) => {
    try {
      const response = await verifyEmail(data);

      toast.success(response.message || "Email verified successfully.");

      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleResendOtp = async () => {
    const currentEmail = getValues("email");

    if (!currentEmail) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      const response = await resendVerificationOtp({
        email: currentEmail,
      });

      toast.success(response.message || "OTP sent successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="page-container">
      <Card
        title="Verify Email"
        description="Enter the OTP sent to your email address."
        footer={
          <p className="text-center text-sm text-slate-600">
            Already verified?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Sign In
            </Link>
          </p>
        }
      >
        <form
          onSubmit={handleSubmit(handleVerify)}
          className="space-y-5"
          aria-label="Email verification form"
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

          <Input
            label="OTP"
            placeholder="Enter 6-digit OTP"
            autoComplete="one-time-code"
            inputMode="numeric"
            maxLength={6}
            error={errors.otp?.message}
            {...register("otp", otpValidation)}
          />

          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting}
          >
            Verify Email
          </Button>

          <button
            type="button"
            onClick={handleResendOtp}
            className="w-full text-sm font-medium text-blue-600 transition hover:text-blue-700"
          >
            Resend OTP
          </button>
        </form>
      </Card>
    </div>
  );
}

export default VerifyEmail;