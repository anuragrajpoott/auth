import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  changePassword,
  deleteAccount,
} from "../features/auth/authApi";
import { clearUser } from "../features/auth/authSlice";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";

const passwordValidation = {
  required: "Password is required.",
};

const newPasswordValidation = {
  required: "New password is required.",
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
    message:
      "Password must contain uppercase, lowercase, number and special character.",
  },
};

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async ({ currentPassword, newPassword }) => {
    try {
      const response = await changePassword({
        currentPassword,
        newPassword,
      });

      toast.success(
        response.message || "Password changed successfully."
      );

      reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      const response = await deleteAccount();

      dispatch(clearUser());

      toast.success(
        response.message || "Account deleted successfully."
      );

      navigate("/register", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!user) {
    return (
      <Card
        title="Profile"
        description="Unable to load profile information."
      />
    );
  }

  return (
    <div className="space-y-8">
      <Card
        title="Profile"
        description="Your account information."
      >
        <div className="space-y-5">
          <Input
            label="Full Name"
            value={user.name}
            disabled
          />

          <Input
            label="Email"
            value={user.email}
            disabled
          />

          <Input
            label="Role"
            value={user.role}
            disabled
          />

          <Input
            label="Email Status"
            value={user.isVerified ? "Verified" : "Pending"}
            disabled
          />
        </div>
      </Card>

      <Card
        title="Change Password"
        description="Update your account password."
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <PasswordInput
            label="Current Password"
            autoComplete="current-password"
            error={errors.currentPassword?.message}
            {...register(
              "currentPassword",
              passwordValidation
            )}
          />

          <PasswordInput
            label="New Password"
            autoComplete="new-password"
            helperText="Must contain at least 8 characters, uppercase, lowercase, number and special character."
            error={errors.newPassword?.message}
            {...register(
              "newPassword",
              newPasswordValidation
            )}
          />

          <PasswordInput
            label="Confirm Password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Please confirm your password.",
              validate: (value) =>
                value === newPassword ||
                "Passwords do not match.",
            })}
          />

          <Button
            type="submit"
            isLoading={isSubmitting}
          >
            Update Password
          </Button>
        </form>
      </Card>

      <Card
        title="Danger Zone"
        description="Permanently delete your account."
      >
        <Button
          variant="danger"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </Button>
      </Card>
    </div>
  );
}

export default Profile;