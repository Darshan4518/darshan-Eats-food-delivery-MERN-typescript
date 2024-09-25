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

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className=" dark:bg-gray-900 dark:text-gray-100 w-full">
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <Table>
          <TableCaption className="text-gray-500 dark:text-gray-400">
            A list of your recent invoices.
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
            {[1, 2, 3].map((_, idx) => (
              <TableRow key={idx} className="dark:bg-gray-800">
                <TableCell className="font-medium dark:text-gray-100">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium dark:text-gray-100">
                  Title
                </TableCell>
                <TableCell className="font-medium dark:text-gray-100">
                  $100
                </TableCell>
                <TableCell className="font-medium max-w-[100px] md:flex justify-center dark:text-gray-100">
                  <div className="flex items-center justify-center">
                    <Button
                      variant="outline"
                      className="leading-4 text-gray-600 dark:text-gray-300"
                    >
                      <Minus size={12} className="mx-auto" />
                    </Button>
                    <input
                      type="number"
                      id="Quantity"
                      value="1"
                      className="h-10 w-10 text-center border-gray-300 rounded-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                      readOnly
                    />
                    <Button
                      variant="outline"
                      className="leading-4 text-gray-600 dark:text-gray-300"
                    >
                      <Plus size={12} className="mx-auto" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-center sm:text-start dark:text-gray-100">
                  $100
                </TableCell>
                <TableCell className="font-medium text-right dark:text-gray-100">
                  <Button
                    variant="ghost"
                    aria-label="Remove item"
                    className="dark:text-gray-300"
                  >
                    <TrashIcon size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={5}
                className="font-medium  dark:text-gray-100"
              >
                Total
              </TableCell>
              <TableCell className="font-medium text-right dark:text-gray-100">
                $1020
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <div className="mt-8 flex justify-end border-t border-gray-200 pt-8 dark:border-gray-700">
          <div className="w-full max-w-lg space-y-4">
            <dl className="space-y-1 text-sm dark:text-gray-100">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>$250</dd>
              </div>
              <div className="flex justify-between">
                <dt>VAT</dt>
                <dd>$25</dd>
              </div>
              <div className="flex justify-between">
                <dt>Discount</dt>
                <dd>-$20</dd>
              </div>
              <div className="flex justify-between text-base font-medium dark:text-gray-100">
                <dt>Total</dt>
                <dd>$200</dd>
              </div>
            </dl>

            <div className="flex justify-end">
              <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                <Percent size={16} className="mr-1" />
                <p className="whitespace-nowrap text-xs">2 Discounts Applied</p>
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
        <CheckoutConfirm open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Cart;
