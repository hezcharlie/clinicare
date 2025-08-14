import ErrorAlert from "@/components/ErrorAlert";
import useMetaArgs from "@/hooks/useMeta";
import { validateResetPasswordSchema } from "@/utils/dataSchema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RiLockFill } from "@remixicon/react";
import { resetPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";

export default function ResetPassword() {
  useMetaArgs({
    title: "Reset Password - Clinicare",
    description: "Reset your Clinicare account password",
    keyword: "Clinicare, Account, Password Reset",
  });
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateResetPasswordSchema),
  });
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  //the above function helps look for values on our URL bar
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const togglePassword = () => {
    setIsVisiblePassword((prev) => !prev);
  };
  const toggleConfirmPassword = () => {
    setIsVisibleConfirmPassword((prev) => !prev);
  };

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      toast.success(response?.data?.message);
      navigate("/account/signin");
    },
    onError: (error) => {
      console.log(error);
      setError(error?.response?.data?.message);
    },
  });

  const onSubmit = async (data) => {
    const userData = { ...data, email, token };
    mutation.mutate(userData);
  };

  return (
    <div className="min-h-[75vh] md:min-h-[81vh] gap-2 flex items-center justify-center px-4 py-5">
      <div className="w-full max-w-[400px] bg-white p-4 rounded-xl shadow">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2 "
        >
          <RiLockFill
            size={40}
            className="text-blue-500 p-1.5 border-[0.2px] border-blue-500 rounded-full shadow-lg"
          />
          <h1 className="text-2xl font-bold">Create New Password</h1>
          <p className="text-muted-foreground text-center text-sm">
            Please enter a new password. Your new password must be different
            from your previous password.
          </p>
          <div className="w-full md:w-[350px]">
            {error && <ErrorAlert error={error} />}
            {/* this above will display the error message created in our ErrorAlert.jsx if there's a problem */}
            <div className="relative">
              <fieldset className="fieldset relative">
                <legend className="fieldset-legend">Password</legend>
                <div>
                  <input
                    {...register("password")}
                    className="input w-full"
                    id="password"
                    name="password"
                    type={isVisiblePassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="right-2 top-4 border-0 focus:outline-none cursor-pointer font-semibold absolute"
                  >
                    {isVisiblePassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors?.password?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.password?.message}
                  </p>
                  // this above takes the password argument we created in our dataSchema
                )}
              </fieldset>
            </div>
            <div className="relative">
              <fieldset className="fieldset relative">
                <legend className="fieldset-legend">Confirm Password</legend>
                <div>
                  <input
                    {...register("confirmPassword")}
                    className="input w-full"
                    id="confirmPassword"
                    name="confirmPassword"
                    type={isVisibleConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPassword}
                    className="right-2 top-4 border-0 focus:outline-none cursor-pointer font-semibold absolute"
                  >
                    {isVisibleConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors?.confirmPassword?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.confirmPassword?.message}
                  </p>
                  // this above takes the password argument we created in our dataSchema
                )}
              </fieldset>
            </div>
            <div>
              <button
                className="btn bg-blue-500 hover:bg-blue-600 text-white w-full md:w-[350px] my-4"
                type="submit"
                disabled={isSubmitting || mutation.isPending}
              >
                {" "}
                {isSubmitting || mutation.isPending ? "Resetting..." : "Reset"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
