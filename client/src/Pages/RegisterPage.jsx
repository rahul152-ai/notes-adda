import React, { useState } from "react";
import {
  FaUserCircle,
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaUserAlt,
  FaLock,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const SubmitHandler = async () => {
    if (!username || !password || !email) {
      return toast(
        "Please fill username eamil password because all the field are required"
      );
    }
    const data = { username, email, password };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        toast(response.data.message);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data);
        return toast(error.response.data);
      });
    // console.log(config);
  };

  const handleKeyDown = (event) => {
    // console.log("User pressed: ", event.key);

    if (event.key === "Enter") {
      // 👇 your logic here
      alert("Enter key pressed ✅");
    }
  };
  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... h-[100vh] flex w-full items-center justify-center">
        <div className="text-center w-380 h-450 bg-black p-20 flex flex-col justify-start opacity-70 rounded-2xl">
          <div className="flex flex-col items-center justify-center">
            <a href="k">
              <FaUserCircle className="text-white text-8xl" />
            </a>
            <h4 className="text-white mt-2 text-2xl">SIGN UP </h4>
          </div>
          <div className="">
            <form className="">
              <div className="flex items-center justify-center my-4">
                <div className="rounded-l bg-[#d3d8e0] px-3 py-[10px] ">
                  <span className="">
                    <FaUserAlt className="text-xl" />
                  </span>
                </div>
                <input
                  type="text"
                  className=" outline-none py-2 px-1 rounded-r bg-white"
                  placeholder="Enter You Name"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center my-4">
                <div className="rounded-l bg-[#d3d8e0] px-3 py-[10px] ">
                  <span className="">
                    <MdEmail className="text-xl" />
                  </span>
                </div>
                <input
                  type="email"
                  className=" outline-none py-2 px-1 rounded-r bg-white"
                  placeholder="Enter You Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <div className=" rounded-l bg-[#d3d8e0] px-3 py-[10px]">
                  <span className="">
                    <FaLock className="text-xl" />
                  </span>
                </div>
                <input
                  type="password"
                  className="outline-none py-2 px-1 rounded-r text-black"
                  placeholder="Password"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="text-black bg-[#cacfd6]  my-5 px-[5.1rem] rounded hover:bg-[#9ba2ac] py-2 font-bold"
                onClick={SubmitHandler}
              >
                REGISTER
              </button>
              <div className="">
                <div className="text-white">
                  <input type="checkbox" /> Remember ME
                </div>
                <div className="text-white">
                  <Link to="/login" className="underline">
                    Already Have account
                  </Link>
                </div>
              </div>
            </form>
            <div className="flex items-center justify-evenly mt-2">
              <a href="f" className="">
                <FaGoogle className="text-white hover:text-red-500 text-3xl" />
              </a>
              <a href="f">
                <FaFacebook className="text-white hover:text-red-500 text-3xl" />
              </a>
              <a href="login">
                <FaGithub className="text-white hover:text-red-500 text-3xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default Register;
