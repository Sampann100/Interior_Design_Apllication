import React from "react";
import "../src/App.css";
import Navbar from "../src/Heading-Part/Navbar";
import Footer from "../src/Heading-Part/Footer";
import { Outlet } from "react-router-dom";
import FetchItem from "../src/NavbarBtn/FetchItem";
import { useSelector } from "react-redux";
import Loader from "../src/Body-Part/Loader";

function App() {
  const fetchStatus = useSelector((store) => store.fetchStatus);

  return (
    <>
      <Navbar/>
      <FetchItem />
      {fetchStatus?.currentlyFetching ? <Loader /> : <Outlet />}
      <Footer />
    </>
  );
}

export default App;
