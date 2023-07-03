import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
const PdfSection = ({ searchQuery }) => {
  // const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [notes, setNotes] = useState("");
  // const { searchQuery } = props;

  //Function to view pdf
  const handleviewpdf = async (id) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/notes/retrive/${id}`,
      headers: {
        Authorization: user.token,
      },
      responseType: "arraybuffer",
    };

    // console.log("api calling ");
    const response = await axios.request(config);
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    // Open the PDF file in a new tab
    window.open(url, "_blank");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:3000/api/notes/getAllNotes`;
        if (searchQuery) {
          url = `http://localhost:3000/api/notes/search?search=${searchQuery}`;
        }
        const response = await axios.get(url, {
          headers: {
            Authorization: user.token,
          },
        });
        setNotes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchQuery]);

  return (
    <>
      {/* <Navbar /> */}
      <div className="sm:flex sm:flex-wrap sm:gap-x-6 sm:justify-center">
        {notes &&
          notes.map((element, index) => (
            <div
              key={element._id}
              className="flex flex-col gap-6 mt-8 sm:mt-8 md:p-2 md:border md:rounded-xl  md:flex md:flex-col md:gap-7 bg-[#0000006b] sm:w-[48%]"
            >
              <div className="border flex justify-between items-center flex-col rounded-xl my-2 p-4 md:flex md:flex-row md:p-0 md:border-none md:gap-2">
                <div className="flex items-center flex-col justify-center gap-3 md:flex md:flex-row md:border md:p-2 md:rounded-xl md:bg-[#3d3d3dae]">
                  <div>
                    <img
                      src="https://play-lh.googleusercontent.com/BkRfMfIRPR9hUnmIYGDgHHKjow-g18-ouP6B2ko__VnyUHSi1spcc78UtZ4sVUtBH4g"
                      alt="#"
                      className="w-28 rounded"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h2 className="text-center text-[white] font-medium text-2xl tracking-widest md:text-start">
                      {element.title}
                    </h2>
                    <div className="text-center text-[#cfcfcf] tracking-widest md:text-start">
                      <p>{element.description.slice(0, 30)}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[white] rounded border border-[white] text-[white] bg-transparent px-12 py-3 hover:bg-[white] hover:text-[#242429] transition duration-[1.4s] ease-in-out md:py-2 md:px-8">
                  {element.content ? (
                    <Link
                      to={`/${element._id}`}
                      className="text-xl tracking-[3px]"
                    >
                      View
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleviewpdf(element._id)}
                      className="text-xl tracking-[3px]"
                    >
                      View Pdf
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
};

export default PdfSection;
