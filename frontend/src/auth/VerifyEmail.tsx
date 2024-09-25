import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useAuthModel } from "@/store/useAuthModel";

const VerifyEmail = () => {
  const { setTab } = useAuthModel();

  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { loading, verifyEmail } = useUserStore();

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const verifyOTPHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (value.length < 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    await verifyEmail(value);
  };

  return (
    <div className="mx-auto max-w-md sm:max-w-lg">
      <form
        onSubmit={verifyOTPHandler}
        className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white dark:bg-gray-800"
      >
        <h3 className="text-center text-lg font-medium text-gray-900 dark:text-gray-100">
          Verify Email
        </h3>
        <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
          Enter the OTP sent to your email
        </p>

        {/* OTP Input */}
        <div className="w-full flex justify-center">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={handleChange}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          >
            <InputOTPGroup className="text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup className="text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-center text-sm font-semibold text-red-500">
            {error}
          </p>
        )}

        {/* Button with loader */}
        <Button
          type="submit"
          className={`flex w-full rounded-md border ${
            loading
              ? "bg-indigo-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          } px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring`}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin mr-2" /> : "Verify"}
        </Button>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Back to
          <Button variant={"link"} onClick={() => setTab("login")}>
            Login
          </Button>
        </p>
      </form>
    </div>
  );
};

export default VerifyEmail;
