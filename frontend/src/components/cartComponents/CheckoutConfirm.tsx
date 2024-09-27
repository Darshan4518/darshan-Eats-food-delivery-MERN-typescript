import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UserInputState } from "@/schema/authScheama";
import { useUserStore } from "@/store/useUserStore";

interface CheckoutConfirmState extends UserInputState {
  email: string;
}

const CheckoutConfirm = ({
  open,
  setOpen,
  setOpenPayemnt,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setOpenPayemnt: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUserStore();

  const [formData, setFormData] = useState<CheckoutConfirmState>({
    fullName: user?.fullName || "",
    email: user?.email || "",
    country: user?.country || "",
    address: user?.address || "",
    city: user?.city || "",
    contact: user?.contact || "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = () => {
    setOpen(false);
    setOpenPayemnt(true);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className="dark:bg-gray-800 dark:text-gray-100 overflow-auto max-h-[90vh] w-full sm:max-w-lg p-4 sm:p-6"
        >
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-gray-600 dark:text-gray-300 my-2">
              Review your Order
            </DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400 text-sm">
              Double-check your items, quantities, and prices before proceeding
              to checkout. Make sure everything looks correct to avoid any
              issues with your order. If you need to make changes, you can go
              back and update your cart.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 w-full"
                placeholder="darshan"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 w-full"
                placeholder="darshan@gmail.com"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Contact
              </Label>
              <Input
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 w-full"
                placeholder="Country"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Country
              </Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 w-full"
                placeholder="Country"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 w-full"
                placeholder="123 Main St"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                City
              </Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 w-full"
                placeholder="City"
                required
              />
            </div>

            <Button
              onClick={handleClick}
              type="submit"
              className="mt-4 w-full bg-orange-400 dark:bg-orange-600"
            >
              Continue to Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutConfirm;
