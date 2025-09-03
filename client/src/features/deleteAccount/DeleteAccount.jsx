import { deleteAccount } from "@/api/auth";
import Modal from "../../components/Modal";
import { useState } from "react";
import { RiDeleteBinLine } from "@remixicon/react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/contextStore";
import ErrorAlert from "../../components/ErrorAlert";

export default function DeleteAccount() {
     const [isOpen, setIsOpen] = useState(false);
     const { accessToken, setAccessToken } = useAuth();
      const queryClient = useQueryClient();
      const [error, setError] = useState(null);
      
    const mutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: async (response) => {
      if (response.status === 200) {
        toast.success(response?.data?.message);
        //clears all cacched keys from tanstack query
        queryClient.clear();
        setAccessToken(null);
        // window.location.reload()
      }
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Error deleting your account");
    },
  });

  const onDelete = async () => {
    mutation.mutate(accessToken);
  };
  return (
     <>
      <button
        className={` ${
          location.pathname === "/verify-account"
            ? "btn bg-red-500 hover:bg-red-600 text-white"
            : ""
        } p-2 flex gap-2 items-start text-base btn w-full md:w-[200px]  bg-red-500 text-white cursor-pointer text-red-500`}
        onClick={() => setIsOpen(true)}
      >
        <RiDeleteBinLine /> Delete Account
      </button>
      <Modal
        id="logoutModal"
        isOpen={isOpen}
        classname="bg-white p-4 rounded-xl shadow w-[90%] max-w-[400px] mx-auto "
      >
        <div className="flex flex-col items-center gap-2 w-full">
          <RiDeleteBinLine size={40} className="text-white" />
          <h1 className="text-2xl font-bold">Delete Account</h1>
          <p>Are you sure you want to delete your account?</p>
          {error && <ErrorAlert error={error} /> }
          <div className="mt-4 mb-2 flex gap-2">
            <button
              type="button"
              className="btn btn-outline w-[150px] border-[0.2px] border-gray-500"
              onClick={() => setIsOpen(false)}
            >
              cancel
            </button>
            <button
              className="btn bg-red-500 hover:bg-red-600 text-white w-[160px]"
              type="button"
              disabled={mutation.isPending}
              onClick={onDelete}
            >
             {mutation.isPending ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
