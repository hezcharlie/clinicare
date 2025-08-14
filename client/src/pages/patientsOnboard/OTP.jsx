import PinField from "react-pin-field";
import React, { useEffect, useState } from "react";
import { RiMailFill } from "@remixicon/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { verifyAccount, resendVerificationCode } from "@/api/auth";
import ErrorAlert from "@/components/ErrorAlert";
import { useAuth } from "@/contextStore";
import { useNavigate } from "react-router";

export default function OTP() {
  const [verificationToken, setVerificationToken] = useState("");
  // const [isSubmitting] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { accessToken, user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const TIMER_STORAGE_KEY = "verification_time_end";

  useEffect(() => {
    const savedEndTime = localStorage.getItem(TIMER_STORAGE_KEY);
    if (savedEndTime) {
      const endTime = parseInt(savedEndTime, 10);
      const now = Math.floor(Date.now() / 1000);
      const remaining = Math.max(0, endTime - now);

      if (remaining > 0) {
        setTimer(remaining);
        setIsResendDisabled(true);
      } else {
        localStorage.removeItem(TIMER_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    let interval;
    // Stop the timer if verification was successful
    if (timer > 0) {
      setIsResendDisabled(true);
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1 && interval !== null) {
            setIsResendDisabled(false);
            clearInterval(interval);
            localStorage.removeItem(TIMER_STORAGE_KEY);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [timer]);

  const mutation = useMutation({
    mutationFn: verifyAccount,
    onSuccess: (response) => {
      toast.success(response?.data?.message || "Account verified");
      //clear old userdata and refetch
      queryClient.invalidateQueries({ queryKey: ["auth_user"] });
      setSuccess(true);
    },
    onError: (error) => {
      console.log(error);
      setError(error?.response?.data?.message || "Account verification failed");
    },
  });

  const sendResendToken = useMutation({
    mutationFn: resendVerificationCode,
    onSuccess: (response) => {
      toast.success(response?.data?.message || "Verification token sent");
    },
    onError: (error) => {
      console.log(error);
      setError(error?.response?.data?.message || "Verification code failed");
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ verificationToken, accessToken });
  };

  const handleResendCode = async (e) => {
    e.preventDefault();
    const newTimer = 60;
    setTimer(newTimer);
    const endTime = Math.floor(Date.now() / 1000) + newTimer;
    localStorage.setItem(TIMER_STORAGE_KEY, endTime.toString());
    if (!accessToken) {
      toast.error("Session expired. Please refresh the page and try again.");
      return;
    }
    sendResendToken.mutate(accessToken);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] gap-2">
      {success || user?.isVerified ? (
        <>
          <div className="p-4 max-w-[800px] mx-auto text-center">
            <img src="/Success.svg" alt="success" className="w-full h-full" />
            <h1 className="text-2xl font-bold">Congratulations!</h1>
            <p className="text-gray-600">
              {user?.isVerified
                ? "Your account has already been verified."
                : "Your account has been verified successfully."}
            </p>
            <button
              className="btn my-4 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
              size="lg"
              onClick={() => navigate("/", { replace: true })}
            >
              Go back to home
            </button>
          </div>
        </>
      ) : (
        <div className=" max-w-[400px] p-4 w-full rounded-xl shadow bg-white">
          <form
            action="/account/verify-code"
            className="flex flex-col gap-2"
            onSubmit={onSubmit}
          >
            <div className="flex justify-center">
              <RiMailFill
                size={40}
                className="border border-blue-500 rounded-full text-blue-500 p-1.5 shadow-lg"
              />
            </div>
            <h1 className="text-2xl font-bold text-center">OTP Verification</h1>
            <p className="text-muted-foreground text-center">
              We have sent verification code to your email. Please enter it
              below.
            </p>
            {error && <ErrorAlert error={error} />}
            <div className="w-full md:w-[350px] flex items-center justify-center">
              <PinField
                length={6}
                autoComplete="one-time-code"
                autoCorrect="off"
                dir="ltr"
                pattern="[0-9]"
                type="text"
                value={verificationToken}
                onChange={(value) => {
                  setVerificationToken(value);
                }}
                className="w-[50px] sm:w-[57px] text-center border border-gray-300 rounded-md p-2 font-bold my-2  "
              />
            </div>
            <button
              type="submit"
              className="btn bg-blue-500 mt-4 text-white  "
              disabled={verificationToken.length !== 6 || mutation.isPending}
            >
              {mutation.isPending ? "Verifying..." : "verify"}
            </button>
          </form>
          <form
            className="flex flex-col items-center gap-1 fieldset"
            onSubmit={handleResendCode}
          >
            <p className=" text-center p-2">
              Code not received or code expired?
            </p>
            <button
              className={`btn bg-blue-500 hover:bg-blue-600 ${
                isResendDisabled
                  ? "text-black cursor-not-allowed"
                  : "text-white"
              }`}
              type="submit"
              disabled={isResendDisabled}
            >
              {isResendDisabled ? `Resending in ${timer}s` : "Resend Code"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
