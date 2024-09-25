import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";

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

// Description for the dashboard
export const description =
  "Food order dashboard with summary cards and recent orders table.";

// Define the types for the orders
interface Order {
  customerName: string;
  email: string;
  orderType: string;
  orderStatus: string;
  orderDate: string;
  orderAmount: string;
}

const recentOrders: Order[] = [
  {
    customerName: "Olivia Martin",
    email: "olivia.martin@email.com",
    orderType: "Delivery",
    orderStatus: "Completed",
    orderDate: "2024-09-10",
    orderAmount: "$45.00",
  },
  {
    customerName: "Jackson Lee",
    email: "jackson.lee@email.com",
    orderType: "Pickup",
    orderStatus: "Pending",
    orderDate: "2024-09-09",
    orderAmount: "$22.00",
  },
  {
    customerName: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    orderType: "Delivery",
    orderStatus: "Completed",
    orderDate: "2024-09-08",
    orderAmount: "$58.00",
  },
  // Duplicate entries removed
];

export function Dashboard() {
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
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                $23,451.67
              </div>
              <p className="text-xs text-muted-foreground">
                +18.5% from last month
              </p>
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
                1,234
              </div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Sales
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                +567
              </div>
              <p className="text-xs text-muted-foreground">
                +10% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Active Now
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                +124
              </div>
              <p className="text-xs text-muted-foreground">
                +30 since last hour
              </p>
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
            <Button variant="ghost" className="ml-auto">
              View all <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>{order.orderType}</TableCell>
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
                              {order.orderStatus}
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
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell className="text-right">
                      {order.orderAmount}
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
