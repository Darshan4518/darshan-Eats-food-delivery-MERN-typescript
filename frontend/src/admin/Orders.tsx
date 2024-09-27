import { Copy, CreditCard, IndianRupee, MoreVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useEffect, useState } from "react";

export function Orders() {
  const { restaurant, getRestaurant } = useRestaurantStore();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    getRestaurant();
  }, []);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      {restaurant?.orders?.length > 0 ? (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                  Recent orders from your Restuarant.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className=" sm:table-cell">Status</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {restaurant?.orders?.map((order: any) => (
                      <TableRow
                        className="bg-accent cursor-pointer"
                        key={order?._id}
                        onClick={() => {
                          setSelectedOrder(order);
                        }}
                      >
                        <TableCell>
                          <div className="font-medium">
                            {order?.deliveryDetails?.fullName}
                          </div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {order?.deliveryDetails?.email}
                          </div>
                        </TableCell>
                        <TableCell className=" sm:table-cell">
                          <Badge className="text-xs" variant="secondary">
                            {order?.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {order?.createdAt &&
                            new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className=" flex justify-end items-center my-2">
                          <span>{order?.totalAmount?.toFixed(2)}</span>
                          <span>
                            <IndianRupee className=" size-3" />
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div>
            {selectedOrder && (
              <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      {selectedOrder?._id?.slice(0, 8)}
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Copy className="h-3 w-3" />
                        <span className="sr-only">Copy Order ID</span>
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      {selectedOrder?.createdAt &&
                        new Date(selectedOrder?.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Export</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Trash</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="font-semibold">Order Details</div>
                    <ul className="grid gap-3">
                      {selectedOrder?.cartItems?.map((item: any) => (
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            {item?.name} x <span>{item?.quantity}</span>
                          </span>
                          <span className=" flex items-center gap-x-1">
                            {item?.price * item?.quantity}{" "}
                            <IndianRupee className=" size-3" />
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Separator className="my-2" />
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className=" flex items-center gap-x-1">
                          {selectedOrder?.cartItems
                            ?.reduce(
                              (acc: number, item: any) =>
                                acc + item?.price * item?.quantity,
                              0
                            )
                            ?.toFixed(2)}{" "}
                          <IndianRupee className=" size-3" />
                        </span>
                      </li>

                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          DeliveryCharge
                        </span>
                        <span className=" flex items-center gap-x-1">
                          {selectedOrder?.deliveryCharge?.toFixed(2)}{" "}
                          <IndianRupee className=" size-3" />
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Discount</span>
                        <span className=" flex items-center gap-x-1">
                          {selectedOrder?.discount?.toFixed(2)}{" "}
                          <IndianRupee className=" size-3" />
                        </span>
                      </li>

                      <li className="flex items-center justify-between font-semibold">
                        <span className="text-muted-foreground">Total</span>
                        <span className=" flex items-center gap-x-1">
                          {selectedOrder?.totalAmount?.toFixed(2)}{" "}
                          <IndianRupee className=" size-3" />
                        </span>
                      </li>
                    </ul>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                      <div className="font-semibold">Shipping Information</div>
                      <address className="grid gap-0.5 not-italic text-muted-foreground">
                        <span>{selectedOrder?.deliveryDetails?.fullName}</span>
                        <span className=" max-w-12">
                          {selectedOrder?.deliveryDetails?.address}
                        </span>
                      </address>
                    </div>
                    <div className="grid auto-rows-max gap-3">
                      <div className="font-semibold">Billing Information</div>
                      <div className="text-muted-foreground">
                        Same as shipping address
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Customer Information</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Customer</dt>
                        <dd>{selectedOrder?.deliveryDetails?.fullName}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Email</dt>
                        <dd>{selectedOrder?.deliveryDetails?.address}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Phone</dt>
                        <dd>{selectedOrder?.deliveryDetails?.contact}</dd>
                      </div>
                    </dl>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Payment Information</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          <CreditCard className="h-4 w-4" />
                          Visa
                        </dt>
                        <dd>**** **** **** 4532</dd>
                      </div>
                    </dl>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground">
                    Updated
                    <time
                      dateTime={
                        selectedOrder?.updatedAt &&
                        new Date(selectedOrder?.updatedAt).toLocaleDateString()
                      }
                    >
                      {selectedOrder?.updatedAt &&
                        new Date(selectedOrder?.updatedAt).toLocaleDateString()}
                    </time>
                  </div>
                </CardFooter>
              </Card>
            )}
          </div>
        </main>
      ) : (
        <div className=" flex items-center justify-center h-full w-full">
          <h3 className=" text-2xl font-bold ">No Orders</h3>
        </div>
      )}
    </div>
  );
}
