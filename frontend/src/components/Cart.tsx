import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Minus, Plus, TrashIcon, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import CheckoutConfirm from "./cartComponents/CheckoutConfirm";
import { useCartStore } from "@/store/useCartStore";
import PaymentCart from "./cartComponents/PaymentCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, incrementQuantity, decrementQuantity, removeCartItem } =
    useCartStore();

  const [open, setOpen] = useState<boolean>(false);
  const [openPayemnt, setOpenPayemnt] = useState(false);

  // Calculate total price
  const totalPrice: number = cart.reduce(
    (total: number, item: any) =>
      total + (item?.price || 0) * (item?.quantity || 0),
    0
  );

  // Random delivery charge and discount
  const deliveryCharge: number = Math.floor(Math.random() * 100);
  const discount: number =
    totalPrice > 1000
      ? Math.floor(Math.random() * 150)
      : Math.floor(Math.random() * 70);

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 w-full">
      {cart?.length > 0 ? (
        <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Table>
            <TableCaption className="text-gray-500 dark:text-gray-400">
              A list of your cart items.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] dark:bg-gray-800">
                  Items
                </TableHead>
                <TableHead className="dark:bg-gray-800">Title</TableHead>
                <TableHead className="dark:bg-gray-800">Price</TableHead>
                <TableHead className="dark:bg-gray-800">Quantity</TableHead>
                <TableHead className="dark:bg-gray-800">Subtotal</TableHead>
                <TableHead className="text-right dark:bg-gray-800">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart?.map((item: any, idx) =>
                item ? (
                  <TableRow key={idx} className="dark:bg-gray-800">
                    <TableCell className="font-medium dark:text-gray-100">
                      <Avatar>
                        <AvatarImage src={item?.image} />
                        <AvatarFallback>{item?.name}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium dark:text-gray-100">
                      {item?.name}
                    </TableCell>
                    <TableCell className="font-medium dark:text-gray-100">
                      {item?.price || 0} INR
                    </TableCell>
                    <TableCell className="font-medium max-w-[100px] md:flex justify-center dark:text-gray-100">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="outline"
                          className="leading-4 text-gray-600 dark:text-gray-300"
                          onClick={() =>
                            item?._id && decrementQuantity(item._id)
                          }
                        >
                          <Minus size={12} className="mx-auto" />
                        </Button>
                        <input
                          type="number"
                          value={item?.quantity || 1}
                          className="h-10 w-10 text-center pl-2 border-gray-300 rounded-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 bg-transparent"
                          readOnly
                        />
                        <Button
                          variant="outline"
                          className="leading-4 text-gray-600 dark:text-gray-300"
                          onClick={() =>
                            item?._id && incrementQuantity(item._id)
                          }
                        >
                          <Plus size={12} className="mx-auto" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-center sm:text-start dark:text-gray-100">
                      {(item?.price || 0) * (item?.quantity || 0)} INR
                    </TableCell>
                    <TableCell className="font-medium text-right dark:text-gray-100">
                      <Button
                        variant="ghost"
                        aria-label="Remove item"
                        className="dark:text-gray-300"
                        onClick={() => item?._id && removeCartItem(item._id)}
                      >
                        <TrashIcon size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : null
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="font-medium dark:text-gray-100"
                >
                  Total
                </TableCell>
                <TableCell className="font-medium text-start text-orange-500">
                  {totalPrice} INR
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <div className="mt-8 flex justify-end border-t border-gray-200 pt-8 dark:border-gray-700">
            <div className="w-full max-w-lg space-y-4">
              <dl className="space-y-1 text-sm dark:text-gray-100">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>{totalPrice} INR</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Delivery Charge</dt>
                  <dd>{deliveryCharge} INR</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Discount</dt>
                  <dd>- {discount} INR</dd>
                </div>
                <div className="flex justify-between text-base font-medium dark:text-gray-100">
                  <dt>Total</dt>
                  <dd className="text-red-600 font-semibold">
                    {totalPrice - discount + deliveryCharge} INR
                  </dd>
                </div>
              </dl>

              <div className="flex justify-end">
                <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                  <Percent size={16} className="mr-1" />
                  <p className="whitespace-nowrap text-xs">
                    {discount / 10} Discounts Applied
                  </p>
                </span>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="secondary"
                  onClick={() => setOpen(true)}
                  className="dark:bg-indigo-700 dark:text-gray-100"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>

          <CheckoutConfirm
            open={open}
            setOpen={setOpen}
            setOpenPayemnt={setOpenPayemnt}
          />
          <PaymentCart
            openPayemnt={openPayemnt}
            setOpenPayemnt={setOpenPayemnt}
            totalAmount={totalPrice}
            totalPrice={totalPrice}
            discount={discount}
            deliveryCharge={deliveryCharge}
          />
        </div>
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold dark:text-white text-center">
            Your cart is currently empty. Start adding items to place your
            order!
          </h3>
          <Link to={"/"}>
            <Button variant="link" className="my-5 text-2xl text-red-500">
              Back to Home
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
