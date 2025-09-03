import UploadImage from "@/features/settings/UploadImage";
import useMetaArgs from "@/hooks/useMeta";
import { useEffect, useState } from "react";
import { useAuth } from "@/contextStore";
import { validateUserSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formDate } from "@/utils/constants";
import ErrorAlert from "@/components/ErrorAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { updateUserProfile } from "@/api/auth";
import DeleteAccount from "@/features/deleteAccount/DeleteAccount";

export default function Account() {
  useMetaArgs({
    title: "Patients Account- Clinicare",
    description: "Clinicare, User Account Setting",
    keywords: "Clinicare, Account, Setting",
  });

  const { user, accessToken } = useAuth();
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateUserSchema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setValue("fullname", user.fullname);
      setValue("email", user.email);
      setValue("phone", user.phone || "");
      setValue("dateOfBirth", formDate(user.dateOfBirth || "", "input"));
    }
  }, [user, setValue]);

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(response?.data?.message);
        //clear old user data
        queryClient.invalidateQueries({ queryKey: ["auth_user"] });
      }
    },
    onError: (error) => {
     import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Error updating your profile");
    },
  });
  const onSubmit = async (formData) => {
    mutation.mutate({ formData, accessToken });
  };

  return (
    <div className="space-y-6">
      <h1 className="font-bold text-2xl border-b border-gray-300 pb-3">
        Account
      </h1>
      <>
        <UploadImage />
        <div className=" border-b pb-6 border-gray-300">
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="/dashboard/settings/account"
          >
            {error && <ErrorAlert error={error} />}
           <div className="md:grid grid-cols-12 gap-3">
             <div className="col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Full name</legend>
                <input
                  type="text"
                  id="fullname"
                  className="input w-full"
                  placeholder="Full name"
                  {...register("fullname")}
                />
              </fieldset>
              {errors.fullname?.message && (
                <span className="text-sm text-red-500">
                  {errors.fullname?.message}
                </span>
              )}
            </div>
            <div className="col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email</legend>
                <input
                  type="text"
                  id="email"
                  className="input w-full"
                  placeholder="Email"
                  {...register("email")}
                />
              </fieldset>
              {errors.email?.message && (
                <span className="text-sm text-red-500">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div className="col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">phone</legend>
                <input
                  type="text"
                  id="phone"
                  className="input w-full"
                  placeholder="Phone"
                  {...register("phone")}
                />
              </fieldset>
              {errors.phone?.message && (
                <span className="text-sm text-red-500">
                  {errors.phone?.message}
                </span>
              )}
            </div>
            <div className="col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Date of birth</legend>
                <input
                  type="date"
                  id="date"
                  className="input w-full"
                  placeholder="Full name"
                  {...register("dateOfBirth")}
                />
              </fieldset>
              {errors.dateOfBirth?.message && (
                <span className="text-sm text-red-500">
                  {errors.dateOfBirth?.message}
                </span>
              )}
            </div>
           </div>
            <div className="my-6 flex md:hidden gap-4 justify-center">
              <button
                type="button"
                className="btn btn-outline w-[140px] border border-gray-300"
                onClick={() => navigate("/dashboard/settings")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold border border-gray-300 p-2 rounded-md cursor-pointer w-[140px]"
                disabled={isSubmitting || mutation.isPending}
              >
                {isSubmitting || mutation.isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
        <div className="md:flex justify-between space-y-4 items-center">
          <div className="">
            <h2 className="text-xl font-semibold text-center md:text-start">Delete account</h2>
            <p className="text-sm text-center md:text-start md:max-w-[400px]">
              When you delete your account,you lose access to medical history
              and appointments. We permanently delete your account and all
              associated data
            </p>
          </div>
         <DeleteAccount/>
        </div>
      </>
    </div>
  );
}
