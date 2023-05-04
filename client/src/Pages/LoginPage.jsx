import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaUserAlt,
  FaLock,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [User, setuser] = useState(null);
  const HandleSubmit = async () => {
    try {
      if (!email || !password) {
        return toast.warning("Please Enter all required filed");
      }

      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      if (response.data.status == "error") {
        return toast.warning(response.data.message);
      }

      if (response.status == "200") {
        setuser(response.data);
        // console.log(response.data);
      }

      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      return toast.error(error);
    }
  };

  useEffect(() => {
    if (User) {
      console.log(User);
      dispatch(setUser({ user: User }));
    }
  }, [User]);

  return (
    <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... h-[100vh] flex w-full items-center justify-center">
      <div className="text-center w-380 h-450 bg-black p-20 flex flex-col justify-start opacity-70 rounded-2xl">
        <div className="flex flex-col items-center justify-center">
          <a href="k">
            <FaUserCircle className="text-white text-8xl" />
          </a>
          <h4 className="text-white mt-2 text-2xl">Login</h4>
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="text-black bg-[#cacfd6]  my-5 px-[5.8rem] rounded hover:bg-[#9ba2ac] py-2 font-bold"
              onClick={HandleSubmit}
            >
              LOGIN
            </button>
            <div className="">
              <div className="text-white">
                <input type="checkbox" /> Remember ME
              </div>
              <div className="text-white">
                <Link to="/register" className="underline">
                  Don't have account
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
      <ToastContainer />
    </div>
  );
}

export default Login;
