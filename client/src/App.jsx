import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import ShowListings from "./pages/ShowListings";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/search" element={<Search/>} />
          <Route element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing/>} />
            <Route path="/show-listings" element={<ShowListings/>} />
            <Route path="/edit-listing/:id" element={<EditListing/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
