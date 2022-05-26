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
import Header from "./components/core/Header";
import LoginOrSignup from "./components/user/LoginOrSignup";
import AllUsers from "./components/admin/AllUsers";
import AllCourses from "./components/admin/AllCourses";
import EditCourse from "./components/courses/EditCourse";
import EditProfile from "./components/user/EditUserProfile";
import AddCourse from "./components/courses/AddCourse";
import Courses from "./components/courses/Courses";

function MainRouter() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<LoginOrSignup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/users" element={<AllUsers />}></Route>
        <Route path="/admin/courses" element={<AllCourses />}></Route>
        <Route path="/editCourse" element={<EditCourse />}></Route>
        <Route path="/editProfile" element={<EditProfile />}></Route>
        <Route path="/addCourse" element={<AddCourse />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
      </Routes>
    </Router>
  );
}

export default MainRouter;
