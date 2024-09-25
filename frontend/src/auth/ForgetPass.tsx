import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthModel } from "@/store/useAuthModel";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LucideMail } from "lucide-react";
import { FormEvent, useState } from "react";

const ForgetPass = () => {
  const [email, setEmail] = useState<string>("");

  const { setTab } = useAuthModel();

  const { loading, forgetPassword } = useUserStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await forgetPassword(email);
  };

  return (
    <form
      className="mb-0 mt-6 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800"
      onSubmit={handleSubmit}
    >
      <h3 className="text-center text-lg font-medium text-gray-900 dark:text-gray-100">
        Forgot Password
      </h3>
      <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
        Enter your email address to reset your password
      </p>
      <div>
        <Label htmlFor="email" className="sr-only">
          Email
        </Label>
        <div className="relative">
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border-gray-200 dark:border-gray-700 p-4 pe-12 text-sm shadow-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus-visible:ring-1"
            placeholder="Enter email"
            id="email"
          />
          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <LucideMail className="w-4 h-4 text-gray-400 dark:text-gray-300" />
          </span>
        </div>
      </div>

      {loading ? (
        <Button className="flex w-full rounded-lg bg-indigo-600 hover:bg-indigo-400 px-5 py-3 items-center font-medium text-white">
          <Loader2 className="animate-spin" />
        </Button>
      ) : (
        <Button
          type="submit"
          className="flex items-center w-full rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-400 dark:border-blue-800 focus:outline-none focus:ring active:text-blue-500"
        >
          Send Reset Link
        </Button>
      )}

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Back to
        <Button
          onClick={() => setTab("login")}
          type="button"
          variant={"link"}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-white"
        >
          Login
        </Button>
      </p>
    </form>
  );
};

export default ForgetPass;
