import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegThumbsUp, FaRegCommentAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotesPage = () => {
  const [note, setNotes] = useState("");
  const [comment, setComments] = useState("");
  const user = useSelector((state) => state.user);
  const params = useParams();
  // console.log(user._id);

  const HandleCommentPost = async () => {
    if (!comment) {
      toast.warning("Opps ! Comment is Empty ");
    }
    const res = await axios.post(
      "http://localhost:3000/api/comment",
      {
        comment,
        note_id: params.id,
        user_id: user._id,
      }
      // {
      //   headers: {
      //     Authorization: user.token,
      //   },
      // }
    );
    toast.success(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/notes/notes/${params.id}`,
          {
            headers: {
              Authorization: user.token,
            },
          }
        );
        setNotes(response.data);
        console.log(response.data); // <-- change to log response.data directly
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [comment]);
  return (
    <>
      {note && (
        <div className="p-4">
          <div className="w-full bg-[white] h-min py-2 px-4 border-[2px]">
            <div className="flex w-full h-20 justify-between items-center">
              <h1 className="text-[#000000c6] font-bold">{note.title}</h1>
              <div className="flex items-center gap-2">
                <div className="bg-[url('https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80')] w-6 h-6 bg-cover bg-center rounded-full"></div>
                {/* <h3 className=" text-[#000000a1] text-sm">Rahul Kumar</h3> */}
              </div>
            </div>
            <p className="text-start font-[100] text-[#616161ca]">
              {note.content}
            </p>
            {/* <hr className="w-full border border-[#868686] mt-8 h-[1px]" /> */}
            <div className="w-full border-solid border-[2px] mt-8"></div>

            <div className="flex gap-24 items-center mt-4">
              <div className="flex items-center gap-1">
                <FaRegCommentAlt className="text-4 font-[300] text-[#292929dd]" />
                <p className="text-sm">Post Comment</p>
              </div>
            </div>
            {/* comment  section */}

            <div className=" items-center mt-8">
              <div className="flex flex-col ">
                {/* //post notes section */}
                <textarea
                  type="text"
                  className="rounded border-2 outline-none h-20 py-1 px-1 mb-2"
                  placeholder="Add a comment..."
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
                <button
                  onClick={HandleCommentPost}
                  className=" mb-2 w-full rounded bg-slate-300 hover:bg-slate-400 py-2 font-bold"
                >
                  POST
                </button>
              </div>
              <div>
                <p className="text-center font-bold">COMMENTS</p>
                {/* comments by other user */}
                {note.comments.map((comment) => (
                  <div key={comment._id}>
                    <h1 className="font-bold my-1">
                      {comment.created_by.username}
                    </h1>
                    <p className="font-light">{comment.comment}</p>
                  </div>
                ))}
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
      )}
    </>
  );
};

export default NotesPage;
