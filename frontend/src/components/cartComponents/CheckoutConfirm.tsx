import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
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

interface FormData {
  fullName: string;
  email: string;
  country: string;
  address: string;
  city: string;
}

const CheckoutConfirm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    country: "",
    address: "",
    city: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Updated Profile Data:", formData);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className="dark:bg-gray-800 dark:text-gray-100"
        >
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-gray-600 dark:text-gray-300 my-2">
              Review your Order
            </DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400">
              Double-check your items, quantities, and prices before proceeding
              to checkout. Make sure everything looks correct to avoid any
              issues with your order. If you need to make changes, you can go
              back and update your cart.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
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
                className="mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                placeholder="darshan"
                required
              />
            </div>

            <div className="mb-4">
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
                className="mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                placeholder="darshan@gmail.com"
                required
              />
            </div>

            <div className="mb-4">
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
                className="mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                placeholder="Country"
                required
              />
            </div>

            <div className="mb-4">
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
                className="mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                placeholder="123 Main St"
                required
              />
            </div>

            <div className="mb-4">
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
                className="mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
                placeholder="City"
                required
              />
            </div>

            <Button
              type="submit"
              className="mt-4 w-full bg-orange-400 dark:bg-orange-600"
            >
              Continue to Payment
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutConfirm;
