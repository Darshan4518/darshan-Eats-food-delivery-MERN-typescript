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
import { SignupInputState, singupSchema } from "@/schema/authScheama";
import { useAuthModel } from "@/store/useAuthModel";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, User, Mail, Lock, Phone } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

const SignupPage = () => {
  const [input, setInput] = useState<SignupInputState>({
    email: "",
    password: "",
    fullName: "",
    contact: "",
    role: "user",
  });

  const { setTab } = useAuthModel();

  const { loading, signup } = useUserStore();

  const [validationError, setValidationError] = useState<
    Partial<SignupInputState>
  >({});

  const inputEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const signupSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const formresult = singupSchema.safeParse(input);

    if (!formresult.success) {
      const fieldErrors = formresult.error.formErrors.fieldErrors;
      setValidationError(fieldErrors as Partial<SignupInputState>);
      return;
    }
    await signup(input);
  };

  return (
    <section className="flex items-center justify-center ">
      <div className="max-w-xl w-full p-1 bg-white dark:bg-gray-800 ">
        <h1 className="text-xl font-bold  text-indigo-600 dark:text-indigo-300 sm:text-3xl md:text-2xl text-center">
          Welcome to DarshanEats 🍽️
        </h1>
        <p className="mt-2 leading-relaxed text-gray-500 dark:text-gray-400 text-center">
          Join us for a delightful food ordering experience. Create an account
          to start ordering your favorite meals!
        </p>

        <form className="mt-3 space-y-4" onSubmit={signupSubmitHandler}>
          {/* Full Name Input */}
          <div className="relative">
            <Label
              htmlFor="FullName"
              className="text-gray-700 dark:text-gray-300"
            >
              Full Name
            </Label>
            <div className="flex items-center">
              <User className="absolute left-3 text-gray-400 dark:text-gray-500" />
              <Input
                type="text"
                id="FullName"
                name="fullName"
                onChange={inputEventHandler}
                placeholder="Enter your full name..."
                className="mt-1 pl-10 w-full border-gray-300 dark:border-gray-700 dark:text-white "
              />
            </div>

            {validationError.fullName && (
              <span className="p-2 font-semibold text-red-500 text-xs capitalize">
                {validationError.fullName}
              </span>
            )}
          </div>

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

          {/* Email Input */}
          <div className="relative">
            <Label htmlFor="Email" className="text-gray-700 dark:text-gray-300">
              Email
            </Label>
            <div className="flex items-center">
              <Mail className="absolute left-3 text-gray-400 dark:text-gray-500" />
              <Input
                type="email"
                id="Email"
                name="email"
                onChange={inputEventHandler}
                placeholder="Enter your email address..."
                className="mt-1 pl-10 w-full border-gray-300 dark:border-gray-700 dark:text-white"
              />
            </div>
            {validationError.email && (
              <span className="p-2 font-semibold text-red-500 text-xs capitalize ">
                {validationError.email}
              </span>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <Label
              htmlFor="Password"
              className="text-gray-700 dark:text-gray-300 "
            >
              Password
            </Label>
            <div className="flex items-center">
              <Lock className="absolute left-3 text-gray-400 dark:text-gray-500" />
              <Input
                type="password"
                id="Password"
                name="password"
                onChange={inputEventHandler}
                placeholder="Enter your password..."
                className="mt-1 pl-10 w-full border-gray-300 dark:border-gray-700 dark:text-white"
              />
            </div>

            {validationError.password && (
              <span className="p-2 font-semibold text-red-500 text-xs capitalize">
                {validationError.password}
              </span>
            )}
          </div>

          {/* Contact Input */}
          <div className="relative">
            <Label
              htmlFor="contact"
              className="text-gray-700 dark:text-gray-300"
            >
              Contact
            </Label>
            <div className="flex items-center">
              <Phone className="absolute left-3 text-gray-400 dark:text-gray-500" />
              <Input
                type="text"
                id="contact"
                name="contact"
                onChange={inputEventHandler}
                placeholder="Enter your contact number..."
                className="mt-1 pl-10 w-full border-gray-300 dark:border-gray-700 dark:text-white"
              />
            </div>
            {validationError.contact && (
              <span className="p-2 font-semibold text-red-500 text-xs capitalize">
                {validationError.contact}
              </span>
            )}
          </div>

          <div className="text-center">
            {loading ? (
              <Button className="flex w-full rounded-lg bg-indigo-600 hover:bg-indigo-400 px-5 py-3 items-center font-medium text-white">
                <Loader2 className="animate-spin" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="flex items-center w-full rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              >
                Create an account
              </Button>
            )}

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Already have an account?
              <Button
                variant={"link"}
                type="button"
                className="text-blue-600 hover:text-blue-400 dark:text-blue-500 dark:hover:text-white"
                onClick={() => setTab("login")}
              >
                Log in
              </Button>
              .
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignupPage;
