import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import ToggleDarkModeBtn from "@/components/ToggleDarkModeBtn";
import { useUserStore } from "@/store/useUserStore";

const ResetPass = () => {
  const { id } = useParams();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const { loading, resetPassword } = useUserStore();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    resetPassword(id, password);
  };

  return (
    <div className=" bg-white dark:bg-gray-900 min-h-screen">
      <div className=" absolute float-right p-5">
        <ToggleDarkModeBtn />
      </div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <form
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white dark:bg-gray-800"
            onSubmit={handleSubmit}
          >
            <h3 className="text-center text-lg font-medium text-gray-900 dark:text-gray-100">
              Reset Password
            </h3>
            <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              Enter the new password
            </p>

            {/* Password Input */}
            <div>
              <Label htmlFor="password" className="sr-only">
                New Password
              </Label>
              <div className="relative">
                <Input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  className="w-full rounded-lg border-gray-200 dark:border-gray-700 p-4 pe-12 text-sm shadow-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus-visible:ring-1"
                  placeholder="Enter password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                >
                  {passwordVisible ? (
                    <EyeOffIcon className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                  ) : (
                    <EyeIcon className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                  )}
                </span>
              </div>
            </div>

            {/* Loader or Submit Button */}
            {loading ? (
              <Button className="flex w-full rounded-lg bg-indigo-600 hover:bg-indigo-400 px-5 py-3 items-center font-medium text-white">
                <Loader2 className="animate-spin" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="flex items-center w-full rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-400 dark:border-blue-800 focus:outline-none focus:ring active:text-blue-500"
              >
                Reset Password
              </Button>
            )}

            {/* Back to Login Link */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Back to
              <Link to="/login" className="underline ml-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
