import Modal from "@/components/Modal";
import { validateRoomSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiEditLine } from "@remixicon/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "@/contextStore";
import { updatePatientsAppointment } from "@/api/appointments";
import ErrorAlert from "@/components/ErrorAlert";

export default function Edit({ appointment }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [setShowSuccess, showSuccess] = useState(false);
  const { accessToken } = useAuth();
  const [msg, setMsg] = useState("");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(validateRoomSchema) });

  const appointmentTime = ["10:00 AM", "1:00 PM", "3:00 PM"];

  const mutation = useMutation({
    mutationFn: updatePatientsAppointment,
    onSuccess: (response) => {
      if (response.status === 200) {
        setMsg(response?.data?.message);
        setShowSuccess(true);
      }
    },
    onError: (error) => {
      console.error(error);
      setError(error?.response?.data?.message || "Error updating appointment");
    },
  });

  const resetModal = async () => {
    await queryClient.invalidateQueries({ queryKey: ["getPatientsAppointment"] });
    setIsOpen(false);
    setShowSuccess(false);
    setError(null);
    reset();
  };

  const onSubmit = async (formData) => {
    mutation.mutate({ appointmentId: appointment._id, formData, accessToken });
  };



  return (
    <>
      <RiEditLine className="text-blue-500" onClick={() => setIsOpen(true)} />
      <Modal
        id="editModal"
        isOpen={isOpen}
        className="bg-white p-4 rounded-xl shadow w-[90%] max-w-[400px] mx-auto"
      >
        {error && <ErrorAlert error={error} />}
        {showSuccess ? (
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
                Continue to Rooms
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <form className="gap-2" onSubmit={handleSubmit(onSubmit)}>
              <h1 className="font-bold text-lg">
                Edit Appointment
              </h1>
              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-12 md:col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend"> Appointment Date</legend>
                    <input
                      type="date"
                      className="input"
                      {...register("appointmentDate")}
                    />
                  </fieldset>
                  {errors.appointmentDate?.message && (
                    <span className="text-xs text-red-500">
                      {errors.appointmentDate?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-12 md:col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Appointment Time</legend>
                    <select
                      name="appointmentTime"
                      id="appointmentTime"
                      defaultValue={""}
                      className="select capitalize"
                      {...register("roomType")}
                      disabled={isSubmitting}
                    >
                      <option disabled={true}>Select Time</option>
                      {appointmentTime?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                  {errors.appointmentTime?.message && (
                    <span className="text-xs text-red-500">
                      {errors.appointmentTime?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-12">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Note</legend>
                    <textarea
                      type="input"
                      className="input w-full min-h-[70px]"
                      placeholder="Make a note"
                      {...register("note")}
                    />
                  </fieldset>
                  {errors.note?.message && (
                    <span className="text-xs text-red-500">
                      {errors.note?.message}
                    </span>
                  )}
                </div>
                
               
                
              </div>
              <div className="mt-4 mb-2 flex justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-outline border-[0.2px] border-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn  bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={mutation.isPending || isSubmitting}
                >
                  {mutation.isPending || isSubmitting
                    ? "Editing..."
                    : "Edit"}
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </>
  );
}
