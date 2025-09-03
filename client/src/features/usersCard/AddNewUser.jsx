import Modal from "@/components/Modal";
import { useAuth } from "@/contextStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ErrorAlert from "../../components/ErrorAlert";
import { validateSignUpSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUserAdmins } from "@/api/auth";

export default function AddNewUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [success, setShowSuccess] = useState(false);
  const [showDoctor, setShowDoctor] = useState(false);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  const role = ["admin", "staff", "doctor", "nurse", "patient"];
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

  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateSignUpSchema),
    defaultValues: "",
    fullname: "",
    email: "",
    password: "Techstudio??",
    role: "",
  });
  const togglePassword = () => {
    setIsVisible((prev) => !prev);
  };

  const mutation = useMutation({
    mutationFn: createUserAdmins,
    onSuccess: (response) => {
      if (response.status === 201) {
        setMsg(response?.data?.message);
        setShowSuccess(true);
      }
    },
    onError: (error) => {
      console.error(error);
      setError(error?.response?.data?.message || "Error updating user role");
    },
  });

  const fieldWatch = watch("role");
  useEffect(() => {
    if (fieldWatch === "doctor") {
      setShowDoctor(true);
    } else {
      setShowDoctor(false);
    }
  }, [fieldWatch]);

  const resetModal = async () => {
    await queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    setIsOpen(false);
    setShowSuccess(false);
  };

  const onSubmit = (data) => {
    if (
      (data.role === "doctor" && !data.specialization) ||
      (data.role === "doctor" && !data.availability)
    ) {
      setError("Please select doctor's specialization and availability");
    }
    mutation.mutate({ userData: data, accessToken });
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white font-bold border border-gray-300 p-2 rounded-md cursor-pointer w-[140px]"
        onClick={() => setIsOpen(true)}
      >
        Add New User
      </button>
      <Modal
        id="addNewUser"
        isOpen={isOpen}
        classname="bg-white p-4 rounded-xl shadow w-[90%] max-w-[600px] mx-auto "
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
                onClick={resetModal}
              >
                Continue to Users
              </button>
            </div>
          </>
        ) : (
          <div className="p-2">
            <h1 className="text-2xl font-bold">Create User</h1>
            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
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
                </div>
                <div className="col-span-6">
                  <fieldset className="fieldset relative">
                    <legend className="fieldset-legend">Password</legend>
                    <div>
                      <input
                        className="input w-full"
                        id="password"
                        name="password"
                        type={isVisible ? "text" : "password"}
                        placeholder="Password"
                        {...register("password")}
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
                    )}
                  </fieldset>
                </div>
                <div className="col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Role</legend>
                    <select
                      defaultValue={""}
                      className="select capitalize cursor-pointer w-full"
                      name="role"
                      {...register("role")}
                       disabled={isSubmitting}
                    >
                      <option value="" disabled={true}>Select Role</option>
                      {role?.filter((role) => role !== "patient").map((option, index) => (
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
                  {mutation.isPending ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </>
  );
}
