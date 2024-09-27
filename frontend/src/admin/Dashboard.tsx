import { CreditCard, DollarSign, IndianRupee, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRestaurantStore } from "@/store/useRestaurantStore";

// Description for the dashboard
export const description =
  "Food order dashboard with summary cards and recent orders table.";

export function Dashboard() {
  const { restaurant } = useRestaurantStore();

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Main content */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {/* Summary cards */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl flex items-center font-bold text-gray-900 dark:text-gray-100">
                {restaurant?.orders?.length > 0
                  ? restaurant.orders.reduce(
                      (amount: number, item: any) =>
                        amount + (item?.totalAmount || 0),
                      0
                    )
                  : 0}{" "}
                <span>
                  <IndianRupee className=" size-5" />
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Total Orders
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                + {restaurant?.orders?.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Menus
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                + {restaurant?.menus?.length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle className="text-gray-800 dark:text-gray-200">
                Recent Orders
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                View the latest orders and their details.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {restaurant?.orders?.map((order: any) => (
                  <TableRow key={order?._id}>
                    <TableCell>{order?.deliveryDetails?.fullName}</TableCell>
                    <TableCell>{order?.deliveryDetails?.email}</TableCell>
                    <TableCell>{order?.deliveryDetails?.city}</TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <Badge
                              variant={
                                order.orderStatus === "Completed"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {order.status}
                            </Badge>
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Confirm</DropdownMenuItem>
                          <DropdownMenuItem>Pending</DropdownMenuItem>
                          <DropdownMenuItem>Cancel</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>
                      {order?.createdAt &&
                        new Date(order?.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex items-center justify-end my-2">
                      {order?.totalAmount}
                      <IndianRupee className=" size-3" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default Dashboard;
