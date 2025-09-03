import useMetaArgs from "@/hooks/useMeta";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { updatePasswordSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import ErrorAlert from "@/components/ErrorAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserPassword, logout } from "@/api/auth";
import { useAuth } from "@/contextStore";

export default function Password() {
  useMetaArgs({
    title: "Password-Clinicare",
    description: "Clinicare account password setting",
    keywords: "Clinicare, account, password setting",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { accessToken, setAccessToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
  });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: async (response) => {
      if (response.status === 200) {
        toast.success(response?.data?.message);
        //After password update, log the the user out
        try {
          const res = await logout(accessToken);
          if (res.status === 200) {
            setAccessToken(null);
            queryClient.invalidateQueries({ queryKey: ["auth_user"] });
          }
        } catch {
          // fall back to local cleanup even if API logout fails
          queryClient.invalidateQueries({ queryKey: ["auth_user"] });
          setAccessToken(null);
          navigate("/account/signin");
        }
      }
    },
    onError: (error) => {
      console.log(error);
      setError(error?.response?.data?.message || "Error updating password");
    },
  });

  const onSubmit = async (userData) => {
    mutation.mutate({ userData, accessToken });
  };

  return (
    <div className="space-y-6">
      <h1 className="font-bold text-2xl border-b border-gray-300 pb-3">
        Update Password
      </h1>
      <>
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="/dashboard/settings/password"
            className="mx-auto max-w-[400px] gap-3"
          >
            {error && <ErrorAlert error={error} />}
            <div>
              <fieldset className="fieldset relative">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type={isVisible ? "text" : "password"}
                  id="password"
                  className="input w-full"
                  placeholder="Password"
                  {...register("password")}
                />
                 <button
                type="button"
                onClick={() => setIsVisible((prev) => !prev)}
                 className=" right-2 top-4 border-0 focus:outline-none cursor-pointer font-semibold absolute ">
                  {isVisible ? "Hide" : "Show"}
                </button>
              </fieldset>
              {errors.password?.message && (
                <span className="text-sm text-red-500">
                  {errors.password?.message}
                </span>
              )}
            </div>
            <div>
              <fieldset className="fieldset relative">
                <legend className="fieldset-legend">New Password</legend>
                <input
                  type={isNewVisible ? "text" : "password"}
                  id="newPassword"
                  className="input w-full"
                  placeholder="New Password"
                  {...register("newPassword")}
                />
                 <button
                type="button"
                onClick={() => setIsNewVisible((prev) => !prev)}
                 className=" right-2 top-4 border-0 focus:outline-none cursor-pointer font-semibold absolute ">
                  {isNewVisible ? "Hide" : "Show"}
                </button>
              </fieldset>
              {errors.newPassword?.message && (
                <span className="text-sm text-red-500">
                  {errors.newPassword?.message}
                </span>
              )}
            </div>
            <div>
              <fieldset className="fieldset relative">
                <legend className="fieldset-legend">Confirm Password</legend>
                <input
                  type={isConfirmVisible ? "text" : "password"}
                  id="confirmPassword"
                  className="input w-full"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
                 <button
                type="button"
                onClick={() => setIsConfirmVisible((prev) => !prev)}
                 className=" right-2 top-4 border-0 focus:outline-none cursor-pointer font-semibold absolute ">
                  {isConfirmVisible ? "Hide" : "Show"}
                </button>
              </fieldset>
              {errors.confirmPassword?.message && (
                <span className="text-sm text-red-500">
                  {errors.confirmPassword?.message}
                </span>
              )}
            </div>
            <p className="my-2 text-gray-600 text-sm">
              Note: You will be logged out after updating your password.
            </p>
            <div className="my-6 flex md:hidden gap-4 justify-center">
              <button type="button" className="btn btn-outline w-[140px] border border-gray-300" onClick={() => navigate("/dashboard/settings")}>
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white font-bold border border-gray-300 p-2 rounded-md cursor-pointer w-[140px]" disabled={isSubmitting || mutation.isPending}>
                {isSubmitting || mutation.isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
}
