import CartPage from "@/customer/components/CartPage";
import CustomerHome from "@/customer/pages/CustomerHome";
import { Route, Routes } from "react-router-dom"; // Correct import of Route and Routes

const customerRoutesItem = [
  { path: "/", element: <CustomerHome /> },
  { path: "/cart", element: <CartPage /> },
];
const CustomerRoutes = () => {
  return (
    <Routes>
      {customerRoutesItem.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default CustomerRoutes;
