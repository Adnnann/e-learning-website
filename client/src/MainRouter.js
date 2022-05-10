import React from "react";
// import Dashboard from "./components/dashboard/Dashboard";
// import Signup from "./components/Signup";
// import Signin from "./components/Signin";
// import Footer from "./components/core/Footer";
// import EditProfile from "./components/user/EditProfile";
// import EditPassword from "./components/user/NewPassword";
// import DeleteAccount from "./components/user/DeleteAccount";

// TRANSACTIONS
// import Transactions from "./components/transactions/Transactions";
// import AddNewIncome from "./components/transactions/AddNewIncome";
// import AddNewExpense from "./components/transactions/AddNewExpense";
// import EditTransaction from "./components/transactions/EditTransaction";

// //STATISTICS
// import Statistics from "./components/statistics/Statistics";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import DeleteAccountModal from "./components/user/DeleteAccountModal";
import Header from "./components/core/Header";
import LoginOrSignup from "./components/user/LoginOrSignup";

function MainRouter() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<LoginOrSignup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
}

export default MainRouter;
