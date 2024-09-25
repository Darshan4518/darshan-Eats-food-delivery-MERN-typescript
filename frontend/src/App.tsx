import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import ResetPass from "./auth/ResetPass";
import Profile from "./components/Profile";
import HomePage from "./components/HomePage";
import Restaurants from "./components/Restaurants";
import RestaurantDetails from "./components/restaurantsComponents/RestaurantDetails";
import Cart from "./components/Cart";
import AdminLayout from "./admin/AdminLayout";
import Menu from "./admin/Menu";
import Dashboard from "./admin/Dashboard";
import { Orders } from "./admin/Orders";
import RestaurantForm from "./admin/RestaurantForm";
import Restaurant from "./admin/Restaurant";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:searchkey",
        element: <Restaurants />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "restaurant",
        element: <Restaurant />,
      },
      {
        path: "restaurant/create",
        element: <RestaurantForm />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },

  {
    path: "/reset-password/:id",
    element: <ResetPass />,
  },
]);

function App() {
  return (
    <div className="">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
