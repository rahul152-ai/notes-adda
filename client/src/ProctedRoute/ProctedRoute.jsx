import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { Component, setSearchQuery } = props;
  console.log("RAHUL IN PROCTEDROUTE");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // console.log("rahul", "Before Nagivation");
      return navigate("/login");
    }
  });
  // console.log("rahul", "Before Nagivation");
  return (
    <>
      <Component Component={setSearchQuery} />
    </>
  );
};

export default ProtectedRoute;
