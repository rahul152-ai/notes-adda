import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Barmenu = () => {
  return (
    <>
      <div className="flex flex-col items-center p-4 border border-[#242429] rounded gap-6 shadow-md absolute right-4 h-70 bg-[#242429]">
        <div className="flex items-center gap-7 w-28">
          <FaUserCircle className="bg-transparent text-[white] text-2xl hover:bg-transparent hover:text-[#7fb8d1]" />
        </div>
        <ul className="flex flex-col items-center gap-9">
          <li>
            <Link to="/">
              <p className="text-[white] tracking-widest hover:text-gray-500">
                HOME
              </p>
            </Link>
          </li>
          <li>
            <Link to="mynotes">
              <p className="text-[white] tracking-widest hover:text-gray-500">
                MY NOTES
              </p>
            </Link>
          </li>
          <li>
            <Link to="about">
              <p className="text-[white] tracking-widest hover:text-gray-500">
                ABOUT
              </p>
            </Link>
          </li>
          <li>
            <Link to="postNotes">
              <p className="text-[white] tracking-widest hover:text-gray-500">
                SHARE NOTES
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Barmenu;

// {`${showIcon ? "disabled:hidden" : "hidden"} sm:hidden`}
