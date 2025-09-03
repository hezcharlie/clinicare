import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contextStore";
import { createRoom } from "@/api/rooms";
import { useForm } from "react-hook-form";
import { validateRoomSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Modal from "@/components/Modal";
import ErrorAlert from "@/components/ErrorAlert";

export default function AddRooms() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, setShowSuccess] = useState(false);
  const [msg, setMsg] = useState(null);
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateRoomSchema),
  });

  //    const { isPending, isError, data, error } = useQuery({
  //     queryKey: ["getRoomMeta", accessToken],
  //     queryFn: () => getRoomMeta( accessToken),
  //   });

  const mutation = useMutation({
    mutationFn: createRoom,
    onSuccess: (response) => {
      if (response.status === 201) {
        setMsg(response?.data?.message);
        setShowSuccess(true);
      }
    },
    onError: (error) => {
      console.error(error);
      setError(error?.response?.data?.message || "Error creating room");
    },
  });

  const resetModal = async () => {
    await queryClient.invalidateQueries({ queryKey: ["getAllRooms"] });
    setIsOpen(false);
    setShowSuccess(false);
    setError(null);
    reset();
  };

  const onSubmit = (formData) => {
    mutation.mutate({ formData, accessToken });
  };

  const roomType = ["Regular", "VIP", "ICU", "Deluxe", "Suite"];
  const roomStatus = ["available", "occupation", "maintenance"];

  return (
    <>
      <button
        className="bg-blue-500 text-white font-bold border border-gray-300 p-2 rounded-md cursor-pointer w-[140px]"
        onClick={() => setIsOpen(true)}
      >
        Add Room
      </button>
      <Modal
        id="addRoom"
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
                Continue
              </button>
            </div>
          </>
        ) : (
          <div className="p-2">
            <h1 className="text-2xl font-bold">Add Room</h1>
            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="md:grid grid-cols-12 gap-3">
                <div className="col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Room Number</legend>
                    <input
                      type="text"
                      id="roomNumber"
                      className="input w-full"
                      placeholder="Room Number(1-20)"
                      {...register("roomNumber")}
                    />
                    {errors?.roomNumber?.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors?.roomNumber?.message}
                      </p>
                    )}
                  </fieldset>
                </div>
                <div className="col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Room Type</legend>
                    <select
                      defaultValue={"staff"}
                      className="select capitalize cursor-pointer w-full"
                      name="roomType"
                      {...register("roomType")}
                    >
                      <option value="">Room Type</option>
                      {roomType?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors?.roomType?.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors?.roomType?.message}
                      </p>
                    )}
                  </fieldset>
                </div>
                <div className="col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Room Price</legend>
                    <div>
                      <input
                        className="input w-full"
                        id="roomPrice"
                        placeholder="Room Price"
                        type="text"
                        {...register("roomPrice")}
                      />
                    </div>
                    {errors?.roomPrice?.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors?.roomPrice?.message}
                      </p>
                    )}
                  </fieldset>
                </div>
                <div className="col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Room Status</legend>
                    <select
                      defaultValue={"staff"}
                      className="select capitalize cursor-pointer w-full"
                      name="roomStatus"
                      {...register("roomStatus")}
                    >
                      <option value="">Select Status</option>
                      {roomStatus?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors?.roomStatus?.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors?.roomStatus?.message}
                      </p>
                    )}
                  </fieldset>
                </div>
                <div className="col-span-12">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                      Room Description
                    </legend>
                    <input
                      type="text"
                      id="roomDescription"
                      className="input w-full"
                      placeholder="Room Description"
                      {...register("roomDescription")}
                    />
                    {errors?.roomDescription?.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors?.roomDescription?.message}
                      </p>
                    )}
                  </fieldset>
                </div>{" "}
                <div className="col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Room Capacity</legend>
                    <input
                      type="text"
                      id="roomCapacity"
                      className="input w-full"
                      placeholder="Room Capacity 1-5"
                      {...register("roomCapacity")}
                    />
                    {errors?.roomCapacity?.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors?.roomCapacity?.message}
                      </p>
                    )}
                  </fieldset>
                </div>
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
                  {mutation.isPending ? "Adding..." : "Add Room"}
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </>
  );
}
