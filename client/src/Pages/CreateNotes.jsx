import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import axios from "axios";
const CreateNotes = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [pdf, setPdf] = useState(null);
  const user = useSelector((state) => state.user);
  // console.log(user);

  //function to handle pdf upload

  // const handleFileUpload = async (event) => {
  //   const selectedFile = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(selectedFile);
  //   reader.onload = () => {
  //     setPdf(reader.result);
  //   };
  //   console.log(reader);
  // };

  const HandleSubmit = async () => {
    // console.log(title, description);
    try {
      if (!title || !description) {
        return toast.warning("please fill the all required filed");
      }
      if (content && pdf) {
        return toast.warning("Please filed either content or pdf");
      }
      // console.log(pdf);
      var data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("_id", user._id);
      if (content) {
        data.append("content", content);
      } else {
        data.append("file", pdf);
      }
      // console.log(data);
      const res = await axios.post(
        "http://localhost:3000/api/notes/createNotes",
        data,
        {
          headers: {
            Authorization: user.token,
            "content-type": "multipart/form-data",
          },
        }
        // { data: data }
      );

      if (res.status === 202) {
        return toast.success(res.data);
      }
    } catch (error) {
      return toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="text-center my-6">
        <h1 className="font-bold">Post Notes</h1>
        <h1 className="text-[#f54542] mt-2">
          NOOTE: EITHER UPLOAD PDF OR WRITE NOTES CONTENT AS NOTES
        </h1>
      </div>
      {/* container */}
      <div className="sm:mx-4 mx-1">
        <div className="flex flex-col my-1 ">
          <span>TITLE</span>
          <input
            type="text"
            className="outline-none rounded border-2 px-1 py-2 mt-1"
            placeholder="Enter Notes Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col my-2">
          <span>DESCRIPTION</span>
          <input
            onChange={(e) => setDescription(e.target.value)}
            className="outline-none rounded border-2 px-1 py-2 mt-1"
            type="text"
            placeholder="Enter Key Words relate to Notes"
          />
        </div>
        <div className="flex flex-col my-2">
          <span>CONTENT</span>
          <textarea
            className="h-40 outline-none rounded border-2 px-1 py-2 mt-1"
            type="text"
            placeholder="Enter Notes content"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex flex-col my-2">
          <span>UPLOAD PDF</span>
          <input
            type="file"
            className="mt-1"
            onChange={(e) => setPdf(e.target.files[0])}
          />
        </div>
        <div className="text-center mt-3">
          <button
            className="w-full text-white border-2 rounded-lg py-2 bg-green-600 hover:bg-green-700 "
            onClick={HandleSubmit}
          >
            POST NOTES
          </button>
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
};

export default CreateNotes;
