import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoginInputState, loginSchema } from "@/schema/authScheama";
import { useAuthModel } from "@/store/useAuthModel";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LucideEye, LucideMail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

const SignInForm = () => {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
    role: "user",
  });

  const { setTab } = useAuthModel();

  const { loading, login } = useUserStore();

  const [validationError, setValidationError] = useState<
    Partial<LoginInputState>
  >({});

  const inputEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // loginSchema validation checking
    const formresult = loginSchema.safeParse(input);

    if (!formresult.success) {
      const fieldErrors = formresult.error.formErrors.fieldErrors;
      setValidationError(fieldErrors as Partial<LoginInputState>);
      return;
    }
    await login(input);
  };

  return (
    <div className=" max-w-lg  bg-white dark:bg-gray-800 p-3">
      <h1 className="text-center text-xl font-bold text-indigo-600 dark:text-indigo-300 sm:text-2xl">
        Welcome to DarshanEats 🍽️
      </h1>

      <p className="mx-auto mt-2 max-w-md text-center text-base text-gray-500 dark:text-gray-400">
        Hungry? Order your favorite meals from local restaurants and get them
        delivered fast to your door with DarshanEats.
      </p>

      <form className="mb-0 mt-2 space-y-4  p-4 " onSubmit={loginSubmitHandler}>
        <p className="text-center text-lg font-medium text-gray-700 dark:text-gray-300">
          Sign in to your DarshanEats account
        </p>

        {/* Role Select */}
        <div className="relative">
          <Label htmlFor="role" className="text-gray-700 dark:text-gray-300">
            Sign Up As
          </Label>
          <Select
            onValueChange={(value: string) =>
              setInput({ ...input, role: value })
            }
            defaultValue="user"
          >
            <SelectTrigger className="mt-1 w-full border-gray-300 dark:border-gray-700 dark:text-white">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>

          {validationError.role && (
            <span className="p-2 font-semibold text-red-500 text-xs capitalize">
              {validationError.role}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <div className="relative">
            <Input
              type="email"
              value={input.email}
              onChange={inputEventHandler}
              name="email"
              className="w-full rounded-lg border-gray-200 dark:border-gray-600 p-4 pe-12 text-sm shadow-sm focus-visible:ring-1 dark:bg-gray-700 dark:text-gray-200"
              placeholder="Enter email"
              id="email"
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <LucideMail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            </span>
          </div>
          {validationError.email && (
            <span className="p-2 font-semibold text-red-500 text-xs capitalize">
              {validationError.email}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <div className="relative">
            <Input
              type="password"
              value={input.password}
              onChange={inputEventHandler}
              name="password"
              className="w-full rounded-lg border-gray-200 dark:border-gray-600 p-4 pe-12 text-sm shadow-sm focus-visible:ring-1 dark:bg-gray-700 dark:text-gray-200"
              placeholder="Enter password"
              id="password"
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <LucideEye className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            </span>
          </div>
          {validationError.password && (
            <span className="p-2 font-semibold text-red-500 text-xs capitalize">
              {validationError.password}
            </span>
          )}
        </div>

        {loading ? (
          <Button className="flex w-full rounded-lg bg-indigo-600 hover:bg-indigo-400 px-5 py-3 items-center font-medium text-white ">
            <Loader2 className="animate-spin " />
          </Button>
        ) : (
          <Button
            type="submit"
            className="flex items-center w-full rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 dark:bg-blue-800 dark:hover:text-blue-400 dark:border-blue-800"
          >
            Login
          </Button>
        )}

        <div className=" flex items-center justify-evenly">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            foget passwod ?
            <Button
              variant={"link"}
              type="button"
              className="text-blue-600 hover:text-blue-400 dark:text-blue-500 dark:hover:text-white"
              onClick={() => setTab("forgetpassword")}
            >
              click here
            </Button>
          </p>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            No account?
            <Button
              variant={"link"}
              type="button"
              className="text-blue-600 hover:text-blue-400 dark:text-blue-500 dark:hover:text-white"
              onClick={() => setTab("signup")}
            >
              Sign up
            </Button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
