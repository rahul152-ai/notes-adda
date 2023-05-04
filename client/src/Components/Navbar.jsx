import React, { useEffect, useState } from "react";
import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import Barmenu from "./Barmenu";
import { useDispatch } from "react-redux";
import { unsetUser } from "../Slices/userSlice";

import axios from "axios";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const [showIcon, setIcon] = useState(false);
  const [searchQuery, setSearchQuerys] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setSearchQuery } = props;

  const HandleQuery = (event) => {
    if (event.key === "Enter") {
      // setSearchQuery(event.target.value);
      // alert(`you enter ${searchQuery}`);
      // console.log("RAHUL IN NVABAR");
      setSearchQuery(searchQuery);
    }
  };

  const HandleLogut = async () => {
    dispatch(unsetUser());
    localStorage.removeItem("token");
    return navigate("/login");
  };
  // console.log(searchQuery);
  return (
    <>
      <nav className="flex  items-center bg-[#242429] justify-between p-4 sm:flex sm:justify-between static top-0 z-40">
        <Link to="/" className="logo text-[white] flex gap-2 font-bold">
          <div>
            <hr className="w-9 bg-[white]" />
            <h1 className="text-xs">NOTES</h1>
          </div>

          <div>
            <h1 className="text-xs ml-[2px]">AADA</h1>
            <hr className="w-9 bg-[white]" />
          </div>
        </Link>

        <div className="flex items-center w-40 gap-2 justify-between rounded-2xl sm:ml-12 md:w-64">
          <div className="flex items-center justify-between w-36 px-4 rounded-2xl bg-[#3e3e3e95] sm:w-full md:px-2">
            <input
              onChange={(e) => setSearchQuerys(e.target.value)}
              onKeyDown={HandleQuery}
              type="text"
              id="Search"
              placeholder="Search"
              className="w-24 bg-transparent outline-none sm:w-32 md:w-60 text-[white] md:px-3 md:py-2"
            />
            <label htmlFor="Search" className="text-xs md:text-[18px]">
              <FaSearch className="cursor-pointer text-[#d9d9d9] md:mr-4 hover:transform scale-125" />
            </label>
          </div>

          <FaBars
            className="text-[#b7b7b7] hover:cursor-pointer sm:hidden"
            onClick={() => setIcon(!showIcon)}
          />
        </div>

        {/* <FaBars className="text-[#b7b7b7] hover:cursor-pointer sm:hidden" onClick={() => setIcon(!showIcon)}/> */}

        <div className="hidden sm:flex sm:w-auto sm:gap-2 sm:items-center md:gap-3">
          <p className="text-[white] text-sm hover:text-slate-500">
            <NavLink to="/">HOME</NavLink>
          </p>
          <p className="text-[white] text-sm hover:text-slate-500">
            <NavLink to="about">ABOUT</NavLink>
          </p>
          <p className="text-[white] text-sm hover:text-slate-500">
            <NavLink to="mynotes">MY NOTES</NavLink>
          </p>
          <p className="text-[white] text-sm hover:text-slate-500">
            <NavLink to="postNotes">SHARE NOTES</NavLink>
          </p>
          <p className="text-[white] text-sm hover:text-slate-500">
            <button
              onClick={HandleLogut}
              className="border bg-white text-black rounded px-1 py-1 font-bold  hover:text-slate-500"
            >
              LOG OUT
            </button>
          </p>
        </div>
      </nav>
      {/* <div></div> */}
      <div
        className={`${showIcon ? "disabled:hidden" : "hidden"} sm:hidden z-10`}
      >
        <Barmenu />
      </div>
      <style>
        {" "}
        {`
          .active {
            color: rgb(100 116 139)
          }
        `}
      </style>
      <Outlet />
    </>
  );
};

export default Navbar;
