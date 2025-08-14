import useMetaArgs from "@/hooks/useMeta";
import { RiUser4Fill } from "@remixicon/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateSignUpSchema } from "@/utils/dataSchema";
import { registerUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import ErrorAlert from "@/components/ErrorAlert";
import { useAuth } from "@/contextStore";
import { Link } from "react-router";


export default function SignUp() {
  useMetaArgs({
    title: "Register with Clinicare",
    description:
      "Create your Clinicare account for easy management of your health",
    keywords: "Clinicare, Register, Account,",
  });


  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateSignUpSchema),
  });
  const { setAccessToken } = useAuth();
  //   const queryClient = useQueryClient(); //initializing our queryClient from tanstack
  //mutations are for create, update or delete actions
  const [error, setError] = useState(null);
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      //what you want to do if api call is a success
      toast.success(response?.data?.message || "Registration successful");
      //save accessToken
      setAccessToken(response?.data?.data?.accessToken);
    },
    onError: (error) => {
      console.log(error);
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
    // }
  };
  return (
    <div className="min-h-[75vh] md:min-h-[81vh] gap-2 flex items-center justify-center px-4 pb-1">
      <div className="w-full max-w-[400px] bg-white p-4 rounded-xl shadow">
        <form
        onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2 w-full"
          data-discover="true"
        >
          <RiUser4Fill
            size={40}
            className="text-blue-500 border-[0.2px] border-blue-500 p-1.5 rounded-full shadow-lg"
          />
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground text-center">
            Enter your details to sign up
          </p>
          <div className="w-full md:w-[350px]">
            {error && <ErrorAlert error={error} />}
            {/* this above will display the error message created in our ErrorAlert.jsx if there's a problem */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Full Name</legend>
                <input
                {...register("fullname")}
                  className="input input-md w-full"
                  type="fullname"
                  placeholder="Full Name"
                  id="Fullname"
                  name="fullname"
                  errors={errors}
                />{errors?.fullname?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors?.fullname?.message}</p>
                    // this above takes the fullname argument we created in our dataSchema 
                )}

              </fieldset>
            </div>
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
                    <p className="text-red-500 text-sm mt-1">{errors?.email?.message}</p>
                    // this above takes the email argument we created in our dataSchema 
                )}
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset relative">
                <legend className="fieldset-legend">Password</legend>
                <input
                {...register("password")}
                 type={isVisible ? "text" : "password"}
                  className="input w-full input-md"
                  id="password"
                  name="password"
                  placeholder="Password"
                
                  errors={errors}
                />
                <button
                type="button"
                onClick={() => setIsVisible((prev) => !prev)}
                 className=" right-2 top-4 border-0 focus:outline-none cursor-pointer font-semibold absolute ">
                  {isVisible ? "Hide" : "Show"}
                </button>
                {errors?.password?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors?.password?.message}</p>
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
                {isSubmitting || mutation.isPending
                  ? "Signing Up..."
                  : "Sign Up"}
              </button>
              <p className="text-gray-600 text-sm text-center">
                Already have an account?{" "}
                <Link className="text-blue-500 font-bold" to="/account/signin">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
