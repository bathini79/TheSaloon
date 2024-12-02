import React from "react";
import {
  BrowserRouter,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import CustomerRoutes from "./CustomerRoutes";

const AppRouter = () => {
  // Determine the routes based on the role
  //  customerRoutes;
  return (
    <BrowserRouter>
      {/* <AdminRoutes /> */}
      <CustomerRoutes />
    </BrowserRouter>
  );
};

export default AppRouter;
