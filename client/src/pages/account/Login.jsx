import { RiUser4Fill } from "@remixicon/react";
import useMetaArgs from "@/hooks/useMeta";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateSignInSchema } from "@/utils/dataSchema";
import { useNavigate } from "react-router";
import { loginUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import ErrorAlert from "@/components/ErrorAlert";
import { useAuth } from "@/contextStore";
import { Link } from "react-router";

export default function Login() {
  useMetaArgs({
    title: "Register with Clinicare",
    description:
      "Create your Clinicare account for easy management of your health",
    keywords: "Clinicare, Register, Account,",
  });

  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateSignInSchema),
  });
  const togglePassword = () => {
    setIsVisible((prev) => !prev);
  };
  const { setAccessToken, user } = useAuth();
  const navigate = useNavigate();
  //   const queryClient = useQueryClient(); //initializing our queryClient from tanstack
  //mutations are for create, update or delete actions
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      //what you want to do if api call is a success
      toast.success(response?.data?.message || "Login successful");
      //save accessToken
      setAccessToken(response?.data?.data?.accessToken);
      if (!user?.isVerified) {
        navigate("/verify-account");
      }
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      // toast.error(error?.response?.data?.message || "registration failed")
      setError(error?.response?.data?.message || "Login failed");
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
    <div className="min-h-[75vh] md:min-h-[81vh] gap-2 flex items-center justify-center px-4 py-5">
      <div className="w-full max-w-[400px] bg-white p-4 rounded-xl shadow">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2 "
        >
          <RiUser4Fill
            size={40}
            className="text-blue-500 p-1.5 border-[0.2px] border-blue-500 rounded-full shadow-lg"
          />
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground text-center text-sm">
            Glad to see you again. Login to your account.
          </p>
          <div className="w-full md:w-[350px]">
            {error && <ErrorAlert error={error} />}
            {/* this above will display the error message created in our ErrorAlert.jsx if there's a problem */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email</legend>
                <input
                  {...register("email")}
                  className="input input-md w-full undefine"
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  errors={errors}
                />
                {errors?.email?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.email?.message}
                  </p>
                  // this above takes the email argument we created in our dataSchema
                )}
              </fieldset>
            </div>
            <div className="relative">
              <fieldset className="fieldset relative">
                <legend className="fieldset-legend">Password</legend>
                <div>
                  <input
                    {...register("password")}
                    className="input w-full"
                    id="password"
                    name="password"
                    type={isVisible ? "text" : "password"}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="right-2 top-4 border-0 focus:outline-none cursor-pointer font-semibold absolute"
                  >
                    {isVisible ? "Hide" : "Show"}
                  </button>
                </div>
                {errors?.password?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.password?.message}
                  </p>
                  // this above takes the password argument we created in our dataSchema
                )}
              </fieldset>
              <Link
                className="text-blue-500 text-sm font-bold"
                to="/account/password-reset"
              >
                Forgot Password?
              </Link>
            </div>
            <div>
              <button
                className="btn bg-blue-500 hover:bg-blue-600 text-white w-full md:w-[350px] my-4"
                type="submit"
                disabled={isSubmitting || mutation.isPending}
              >
                {" "}
                {isSubmitting || mutation.isPending ? "Signing In..." : "Login"}
              </button>
              <p className="text-gray-600 text-sm text-center">
                Don't have an account?{" "}
                <Link className="text-blue-500 font-bold" to="/account/signup">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
