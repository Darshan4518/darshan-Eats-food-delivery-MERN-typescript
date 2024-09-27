import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogOverlay } from "./components/ui/dialog";
import SignInForm from "./auth/SignInForm";
import { useAuthModel } from "./store/useAuthModel";
import SignupPage from "./auth/SignUpForm";
import ForgetPass from "./auth/ForgetPass";
import { useUserStore } from "./store/useUserStore";
import VerifyEmail from "./auth/VerifyEmail";
import Footer from "./components/Footer";

const Layout = () => {
  const { open, setOpen, tab } = useAuthModel();
  const { isAuthenticated } = useUserStore();

  return (
    <div className="flex flex-col min-h-screen  bg-white dark:bg-gray-900">
      <Navbar />
      <div className="flex flex-1 w-full bg-gray-100 dark:bg-gray-800">
        <Outlet />
      </div>
      <Dialog
        open={open}
        onOpenChange={() => (isAuthenticated ? setOpen(false) : setOpen(true))}
      >
        <DialogOverlay className="fixed inset-0 bg-black/50 z-40" />
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto mx-auto">
          {tab === "login" && <SignInForm />}
          {tab === "signup" && <SignupPage />}
          {tab === "forgetpassword" && <ForgetPass />}
          {tab === "verifyemail" && <VerifyEmail />}
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default Layout;
