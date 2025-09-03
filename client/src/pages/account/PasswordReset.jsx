import { RiLockFill } from "@remixicon/react";
import useMetaArgs from "@/hooks/useMeta";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateForgotPasswordSchema } from "@/utils/dataSchema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import ErrorAlert from "@/components/ErrorAlert";
import { forgotPassword } from "@/api/auth";

export default function PasswordReset() {
  useMetaArgs({
    title: "Clinicare account password reset",
    description: "Enter your email address to reset your password",
    keywords: "Account, Password, Reset",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateForgotPasswordSchema),
  });
  const [error, setError] = useState(null);
  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      //what you want to do if api call is a success
      toast.success(response?.data?.message || "Password reset link sent");
      //save accessToken
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      // toast.error(error?.response?.data?.message || "registration failed")
      setError(error?.response?.data?.message || "Registration failed");
    },
  });
  const onSubmit = async (data) => {
    mutation.mutate(data); //submitting our form to our mutation function to help us make the api call using our registerUser api
    // our mutation function above takes care of our try and catch function below, so we can remove it totally.
    // try {
    //     //call your signUp API here
    //     toast.success("Account created successfully");
    // } catch (error) {
    //     const errorMassage = error?.message || "Signup not completed";
    //     toast.error(errorMessage);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-6rem)] gap-2">
      <div className="max-w-[400px] p-4 bg-white w-ful rounded-xl shadow ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="/account/reset-password"
          className="flex flex-col items-center gap-2 w-full"
        >
          <RiLockFill
            size={40}
            className="border-[0.2px] border-blue-500 text-blue-500 rounded-full shadow-lg p-1.5 "
          />
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground text-center w-78">
            Enter email address and we'll send you a code to reset your password
          </p>
          <div className="w-full md:w-[350px]">
            {error && <ErrorAlert error={error} />}
            {/* this above will display the error message created in our ErrorAlert.jsx if there's a problem */}
            <div>
              <fieldset className="fieldset relative">
                <legend className="fieldset-legend">Email</legend>
                <input
                  
                  type="email"
                  placeholder="Email"
                  className="input input-md w-full"
                  id="Email"
                  name="Email"
                  {...register("email")}
                />
                {errors?.email?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.email?.message}
                  </p>
                  // this above takes the email argument we created in our dataSchema
                )}
              </fieldset>
            </div>
          </div>
          <button
            className="btn bg-blue-500 text-white w-full md:w-[350px] hover:bg-blue-600"
            type="submit"
            disabled={isSubmitting || mutation.isPending}
          >
            {" "}
            {isSubmitting || mutation.isPending
              ? "Sending..."
              : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
