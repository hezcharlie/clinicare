import useMetaArgs from "@/hooks/useMeta";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/contextStore";
import { validateAccountSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bloodGroup, formDate } from "@/utils/constants";


export default function PatientsOnboard() {
  useMetaArgs({
    title: "Patients Onboard - Clinicare",
    description: "Complete your patient profile",
    keywords: "Clinicare, patients, account",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [field, setField] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateAccountSchema),
  });
  const { user } = useAuth();
  
  const gender = ["male", "female", "other"]
  const bloodGroupOptions = Object.entries(bloodGroup).map(([key, value]) => ({
    name: key,
    id: value,
  }))

  useEffect(() => {
    if (user) {
      setValue("fullname", user.fullname);
      setValue("email", user.phone);
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
    const hassErrors = currentRequiredFields.some((field) => errors[field]);
    setField(hasEmptyFields || hassErrors);
  }, [formValues, errors, currentStep, requiredFields1, requiredFields2]);

  const handleStep = () => {
    if (currentStep === 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div cl>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold pb-4">Patients Onboard</h1>
        <div className="bg-white p-2 rounded-lg shadow flex flex-col justify-center items-center">
          <form
          onSubmit={handleSubmit(onSubmit)}
            action=""
            className="p-2 flex flex-col justify-center items-center"
          >
            <p className="text-center pb-4">
              Hello <strong>{user?.fullname}</strong>, Please complete your
              patient profile
            </p>
            <ul className="steps">
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
                  currentStep === 2 ? "step-primary" : ""
                } `}
              >
                Save
              </li>
            </ul>
            {currentStep === 1 && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Full name</legend>
                      <input
                        type="Fullname"
                        id="fullname"
                        className="input w-full md:w-[350px]"
                        placeholder="Full name "
                      />
                    </fieldset>
                  </div>
                  <div>
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Email</legend>
                      <input
                        type="email"
                        id="email"
                        className="input"
                        placeholder="Email"
                      />
                    </fieldset>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Phone</legend>
                      <input
                        type="Fullname"
                        id="fullname"
                        className="input w-full md:w-[350px]"
                        placeholder="Phone"
                      />
                    </fieldset>
                  </div>
                  <div>
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Date of birth</legend>
                      <input type="date" id="date" className="input" />
                    </fieldset>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Gender</legend>
                      <select
                        defaultValue={""}
                        className="select capitalize w-full"
                        name="gender"
                        {...register("gender")}
                        disabled={isSubmitting}
                      >
                        <option value="">Select Gender</option>
                        {gender?.map((option, index)=> (
                          <option key={index} value={option}> 
                          {option}
                          </option>
                        ))}
                      </select>
                      {errors?.gender?.message && (<span className="text-sm text-redd-50">{errors?.gender?.message}</span>)}
                    </fieldset>
                  </div>
                  <div>
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Blood group</legend>
                      <input className="input"></input>
                    </fieldset>
                  </div>
                </div>
              </>
            )}
            <div></div>
            <div className="m-6 flex gap-4 justify-end">
              {currentStep === 1 && (
                <button onClick={handleStep} disabled={field} className="btn bg-zinc-800 font-bold text-white w-[140px] cursor-pointer">
                  Next
                </button>
              )}
              {currentStep === 2 && (
                <div className="flex gap-4 justify-end">
                  <button onClick={handleStep} disabled={field} >Previous</button>
                  <button>Save</button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
