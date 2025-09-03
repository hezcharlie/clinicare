import Modal from "@/components/Modal";
import { useAuth } from "@/contextStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ErrorAlert from "../../components/ErrorAlert";
import {  validateUpdateUserRoleSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {  updateUserRole } from "@/api/auth";

export default function EditUser({item}) {
  const { accessToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const [success, ShowSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const [ showDoctor, setShowDoctor] = useState(false)

   const availability = ["available", "unavailable", "on leave", "sick"];
  const specialization = [
    "Cardiology",
    "Dermatology",
    "Gastroenterology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Urology",
  ];

  
   
  const role = ["admin", "staff", "doctor", "nurse", "patient"];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateUpdateUserRoleSchema),
  });

   const fieldWatch = watch("role");
    useEffect(() => {
      if (fieldWatch === "doctor") {
        setShowDoctor(true);
      } else {
        setShowDoctor(false);
      }
    }, [fieldWatch]);


  //   const mutation = useMutation({
  //     mutationFn: logout,
  //     onSuccess: async (response) => {
  //       if (response.status === 200) {
  //         toast.success(response?.data?.message);
  //         //clears all cached keys from tanstack query
  //         queryClient.clear();
  //         setAccessToken(null);
  //         // window.location.reload()
  //       }
  //     },
  //     onError: (error) => {
  //       import.meta.env.DEV && console.log(error);
  //       setError(error?.response?.data?.message || "Error deleting your account");
  //     },
  //   });
  const mutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: (response) => {
      if (response.success) {
        setMsg(response?.message);
        ShowSuccess(true);
      }
    },
    onError: (error) => {
      console.error(error);
      setError(error?.response?.data?.message || "Error updating user role");
    },
  });

  useEffect(() => {
    if (item) {
      setValue("role", item?.role);
    }
  }, [item, setValue]);

  const onEdit = async (role) => {
    mutation.mutate({ userId: item._id, role, accessToken });
  };

  //   const onEdit = async () => {
  //     mutation.mutate(accessToken);
  //   };
  const handleClose = async () => {
    await queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    setIsOpen(false);
  };

  return (
    <>
      <button disable={item.role= "patient"} className="btn  max-w-18 h-9" onClick={() => setIsOpen(true)}>
        Edit
      </button>
      <Modal
        id="addNewUser"
        isOpen={isOpen}
        classname="bg-white p-4 rounded-xl shadow w-[90%] max-w-[400px] mx-auto "
      >
        {error && <ErrorAlert error={error} />}
        {success ? (
          <>
          <div className="p-4 text-center">
              <img
                src="/Success.svg"
                alt="success"
                className="w-full h-[200px]"
              />
              <h1 className="text-2xl font-bold">Congratulations!</h1>
              <p className="text-gray-600">{msg}</p>
              <button
                className="btn my-4 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                size="lg"
                onClick={handleClose}
              >
                Continue to Users
              </button>
            </div>
          </>
        ) : (
          <div className="p-2">
            <h1 className="text-2xl font-bold">Create User</h1>

            <form className="space-y-2" onSubmit={handleSubmit(onEdit)}>
              <div className="md:grid grid-cols-12 gap-3">
                {/* <div className="col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Full name</legend>
                <input
                  type="text"
                  id="fullname"
                  className="input w-full"
                  placeholder="Full name"
                  {...register("fullname")}
                />
                 {errors?.fullname?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.fullname?.message}
                  </p>
                )}
              </fieldset>
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
                 {errors?.email?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.email?.message}
                  </p>
                )}
              </fieldset>
              </div> */}
                <div className="col-span-12">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Role</legend>
                    <select
                      defaultValue={""}
                      className="select capitalize cursor-pointer w-full "
                      name="role"
                      {...register("role")}
                    >
                      <option value=""  disabled={true}>Select Role</option>
                      {role?.filter((role) => role !== "patient")?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors?.role?.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors?.role?.message}
                      </p>
                    )}
                  </fieldset>
                </div>

                
                {showDoctor && (
                <>
                <div className="col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Specialization</legend>
                    <select
                      defaultValue={"staff"}
                      className="select capitalize cursor-pointer w-full"
                      name="specialization"
                      {...register("specialization")}
                       disabled={isSubmitting}
                    >
                      <option value="" disabled={true}>Select Specialization</option>
                      {specialization?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors?.specialization?.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors?.specialization?.message}
                      </p>
                    )}
                  </fieldset>
                </div>
                <div className="col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Availability</legend>
                    <select
                      defaultValue={"staff"}
                      className="select capitalize cursor-pointer w-full"
                      name="availability"
                      {...register("availability")}
                       disabled={isSubmitting}
                    >
                      <option value="" disabled={true}>Availability</option>
                      {availability?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors?.availability?.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors?.availability?.message}
                      </p>
                    )}
                  </fieldset>
                </div>
                </>
                 )}


              </div>
              <div className="flex md:justify-end justify-center gap-2 pt-3">
                <button
                  type="button"
                  className="btn btn-outline w-[115px] border-[0.2px] border-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 btn hover:bg-blue-600 text-white w-[115px]"
                  type="submit"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </>
  );
}
