import useMetaArgs from "@/hooks/useMeta";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/contextStore";
import { validatePatientSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bloodGroup, formDate } from "@/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorAlert from "@/components/ErrorAlert";
import { toast } from "sonner";
import { registerPatient } from "@/api/patients";
import { useNavigate } from "react-router";

export default function PatientsOnboard() {
  useMetaArgs({
    title: "Patients Onboard - Clinicare",
    description: "Complete your patient profile",
    keywords: "Clinicare, patients data, account set up",
  });

  const { user, accessToken } = useAuth();
  const [currentStep, setCurrentStep] = useState(
    user?.isCompletedOnboard ? 3 : 1
  );
  const [field, setField] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validatePatientSchema),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const gender = ["male", "female", "other"];

  const bloodGroupOptions = Object.entries(bloodGroup).map(([key, value]) => ({
    name: key,
    id: value,
  }));

  useEffect(() => {
    if (user) {
      setValue("fullname", user.fullname);
      setValue("email", user.email);
      setValue("phone", user.phone || "");
      setValue("dateOfBirth", formDate(user.dateOfBirth || "", "input"));
    }
  }, [user, setValue]);

  const requiredFields1 = useMemo(
    () => ["fullname", "email", "phone", "dateOfBirth", "gender", "bloodGroup"],
    []
  );

  const requiredFields2 = useMemo(
    () => [
      "address",
      "emergencyContact",
      "emergencyContactPhone",
      "emergencyContactRelationship",
    ],
    []
  );
  const formValues = watch();

  useEffect(() => {
    const currentRequiredFields =
      currentStep === 1 ? requiredFields1 : requiredFields2;
    const hasEmptyFields = currentRequiredFields.some(
      (field) => !formValues[field] || formValues[field] === ""
    );
    const hasErrors = currentRequiredFields.some((field) => errors[field]);
    setField(hasEmptyFields || hasErrors);
  }, [formValues, errors, currentStep, requiredFields1, requiredFields2]);

  const mutation = useMutation({
    mutationFn: registerPatient,
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success(response?.data?.message);
        //clear old user data
        queryClient.invalidateQueries({ queryKey: ["auth_user"] });
      }
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message);
    },
  });

  const handleStep = () => {
    if (currentStep === 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (formData) => {
    mutation.mutate({ formData, accessToken });
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col justify-center items-center md:item px-4 py-5 gap-2">
      <h1 className="text-2xl font-bold pb-4 ">Patients Onboard</h1>
      <div className="w-full max-w-[600px] bg-white rounded-lg shadow">
        <p className="text-center pb-4 text-muted-foreground font-medium mb-2 pt-4">
          Hello <strong>{user?.fullname}</strong>,{" "}
          {user?.isCompletedOnboard
            ? "Onboarding completed"
            : "Please complete your patient profile"}
        </p>
        {error && <ErrorAlert error={error} />}

        <ul className="steps flex justify-center">
          <li
            className={`step w-full ${
              currentStep === 1 ? "step-primary" : ""
            } `}
          >
            Details
          </li>
          <li
            className={`step w-full ${
              currentStep === 2 ? "step-primary" : ""
            } `}
          >
            Contact
          </li>
          <li
            className={`step w-full ${
              currentStep === 3 ? "step-primary" : ""
            } `}
          >
            Save
          </li>
        </ul>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 flex flex-col justify-center   "
        >
          {/* general-div */}
          <div className="grid grid-cols-12 gap-3">
            {currentStep === 1 && (
              <>
                <div className="col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Full name</legend>
                    <input
                      type="text"
                      id="fullname"
                      className="input w-full md:w-[280px]"
                      placeholder="Full name "
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
                      type="email"
                      id="email"
                      className="input w-full md:w-[280px]"
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
                    <legend className="fieldset-legend">Phone</legend>
                    <input
                      type="Fullname"
                      id="fullname"
                      className="input w-full md:w-[280px]"
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
                      className="input w-full md:w-[280px]"
                      {...register("dateOfBirth")}
                    />
                  </fieldset>
                  {errors.dateOfBirth?.message && (
                    <span className="text-sm text-red-500">
                      {errors.dateOfBirth?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Gender</legend>
                    <select
                      defaultValue={""}
                      className="select capitalize cursor-pointer w-full md:w-[280px]"
                      name="gender"
                      {...register("gender")}
                      disabled={isSubmitting}
                    >
                      <option value="" disabled={true}>Select Gender</option>
                      {gender?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                  {errors?.gender?.message && (
                    <span className="text-sm text-red-500">
                      {errors?.gender?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Blood group</legend>
                    <select
                      name="bloodGroup"
                      defaultValue={""}
                      className="select capitalize cursor-pointer w-full"
                      {...register("bloodGroup")}
                    >
                      <option value={""}>Select Blood Group</option>{" "}
                      {bloodGroupOptions?.map((option, index) => (
                        <option key={index} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                  {errors.bloodGroup?.message && (
                    <span className="text-sm text-red-500">
                      {errors.bloodGroup?.message}
                    </span>
                  )}
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <div className="col-span-12">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Address</legend>
                    <input
                      type="text"
                      id="address"
                      className="input w-full"
                      placeholder="Address"
                      {...register("address")}
                    />
                  </fieldset>
                  {errors.address?.message && (
                    <span className="text-sm text-red-500">
                      {errors.address?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                      Emergency contact
                    </legend>
                    <input
                      type="text"
                      id="emergency-contact"
                      className="input w-full md:w-[280px]"
                      placeholder="Emergency contact"
                      {...register("emergencyContact")}
                    />
                  </fieldset>
                  {errors.emergencyContact?.message && (
                    <span className="text-sm text-red-500">
                      {errors.emergencyContact?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                      Emergency contact phone
                    </legend>
                    <input
                      type="text"
                      id="emergency-contact-phone"
                      className="input w-full md:w-[280px]"
                      placeholder="Emergency contact phone"
                      {...register("emergencyContactPhone")}
                    />
                  </fieldset>
                  {errors.emergencyContactPhone?.message && (
                    <span className="text-sm text-red-500">
                      {errors.emergencyContactPhone?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                      Emergency contact relationship
                    </legend>
                    <input
                      type="text"
                      id="emergency-contact-relationship"
                      className="input w-full md:w-[280px]"
                      placeholder="Emergency contact relationship"
                      {...register("emergencyContactRelationship")}
                    />
                  </fieldset>
                  {errors.emergencyContactRelationship?.message && (
                    <span className="text-sm text-red-500">
                      {errors.emergencyContactRelationship?.message}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>

          {currentStep === 3 && (
            <div className="md:col-span-12 p-4 text-center">
              <img
                src="/Success.svg"
                alt="success"
                className="w-full h-[200px]"
              />
              <h1 className="text-2xl font-bold">Congratulations!</h1>
              <p className="text-gray-600">
                "Your account has been verified successfully."
              </p>
              <button
                className="btn my-4 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                size="lg"
                onClick={() => navigate("/dashboard", { replace: true })}
              >
                Continue to dashboard
              </button>
            </div>
          )}

          <div className="flex md:justify-end ">
            <div className="pt-3 flex gap-4 justify-end">
              {currentStep === 1 && (
                <button
                  className="btn bg-zinc-800 font-bold text-white w-[140px] cursor-pointer hover:bg-zinc-700"
                  onClick={handleStep}
                  disabled={field}
                >
                  Next
                </button>
              )}
            </div>

            {currentStep === 2 && (
              <div className="flex gap-4 justify-end pt-4">
                <button
                  onClick={handleStep}
                  className="btn bg-zinc-800 font-bold text-white w-[140px] cursor-pointer hover:bg-zinc-700"
                >
                  Previous
                </button>
                <button
                  className="bg-blue-500 text-white font-bold rounded-md cursor-pointer w-[140px]"
                  disabled={mutation.isPending || field}
                  type="submit"
                >
                  {mutation.isPending ? "Saving..." : "Save"}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
