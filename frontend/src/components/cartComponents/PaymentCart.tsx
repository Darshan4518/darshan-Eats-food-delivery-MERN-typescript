import React, { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, User, Calendar, Key, Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import { useOrderStore } from "@/store/useOrderStore";
import { useCartStore } from "@/store/useCartStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";

const PaymentCart = ({
  openPayemnt,
  setOpenPayemnt,
  totalPrice,
  discount,
  totalAmount,
  deliveryCharge,
}: {
  openPayemnt: boolean;
  setOpenPayemnt: Dispatch<SetStateAction<boolean>>;
  totalAmount: number;
  discount: number;
  totalPrice: number;
  deliveryCharge: number;
}) => {
  const { cart } = useCartStore();
  const { restaurant } = useRestaurantStore();
  const { user } = useUserStore();
  const { loading, continuePayment } = useOrderStore();

  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const checkoutSessionRequest: any = {
    cartItems: cart?.map((item) => ({
      menuId: item?._id,
      name: item?.name,
      price: item?.price,
      quantity: item?.quantity,
      image: item?.image,
    })),
    deliveryDetails: user,
    restaurantId: restaurant._id as string,
    totalAmount: totalPrice - discount + deliveryCharge,
    discount,
    deliveryCharge,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await continuePayment(checkoutSessionRequest);
      setOpenPayemnt(false);
    } catch (error) {
      // Handle payment error here
      toast.error("Payment failed");
    }
  };

  return (
    <Dialog
      open={openPayemnt}
      onOpenChange={() => {
        setOpenPayemnt(false);
      }}
    >
      <DialogContent className="p-4 sm:max-w-lg w-full mx-auto">
        <Card className="w-full shadow-md border rounded-lg overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
            <img
              src="/creadit-card.png"
              alt="Credit Card"
              className="h-20 sm:h-24"
            />
          </div>
          <CardHeader className="px-4 sm:px-6 pt-4">
            <CardTitle className="text-xl sm:text-2xl font-semibold text-center">
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 py-4 sm:py-6">
            <div className="text-center mb-4">
              <p className="text-lg font-semibold">Total Amount: </p>
              <p className="text-2xl font-bold text-green-600">
                ₹{totalAmount.toFixed(2)}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="flex flex-col relative">
                <label htmlFor="name" className="mb-1 font-medium text-sm">
                  Name on Card
                </label>
                <div className="flex items-center">
                  <User className="absolute ml-2 text-gray-500" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={handleChange}
                    required
                    className="pl-8 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="flex flex-col relative">
                <label
                  htmlFor="cardNumber"
                  className="mb-1 font-medium text-sm"
                >
                  Card Number
                </label>
                <div className="flex items-center">
                  <CreditCard className="absolute ml-2 text-gray-500" />
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.cardNumber}
                    onChange={handleChange}
                    required
                    maxLength={16}
                    className="pl-8 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <div className="flex flex-col relative w-full sm:w-1/2">
                  <label
                    htmlFor="expiryDate"
                    className="mb-1 font-medium text-sm"
                  >
                    Expiry Date
                  </label>
                  <div className="flex items-center">
                    <Calendar className="absolute ml-2 text-gray-500" />
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiryDate}
                      onChange={handleChange}
                      required
                      maxLength={5}
                      className="pl-8 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="flex flex-col relative w-full sm:w-1/2 mt-4 sm:mt-0">
                  <label htmlFor="cvv" className="mb-1 font-medium text-sm">
                    CVV
                  </label>
                  <div className="flex items-center">
                    <Key className="absolute ml-2 text-gray-500" />
                    <Input
                      id="cvv"
                      name="cvv"
                      type="password"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={handleChange}
                      required
                      maxLength={3}
                      className="pl-8 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-4 text-sm sm:text-base py-2"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : " Pay Now"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentCart;
