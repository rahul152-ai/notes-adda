import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import PdfSection from "./Components/PdfSection";
import LoginPage from "./Pages/LoginPage";
import NotesPage from "./Pages/NotesPage";
import Register from "./Pages/RegisterPage";
import Footer from "./Components/Footer";
import LayOut from "./Pages/LayOut";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/LoginPage";
import CreateNotes from "./Pages/CreateNotes";
import MyNotes from "./Pages/MyNotes";
import About from "./Pages/About";
import ProtectedRoute from "./ProctedRoute/ProctedRoute";
const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // if (searchQuery) {
  //   console.log("RAHUL IN APP PAGE");
  // }

  const handleSearch = () => {};
  return (
    <>
      <div id="root">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route
            path="/"
            element={
              <ProtectedRoute
                Component={() => <Navbar setSearchQuery={setSearchQuery} />}
              />
            }
          >
            <Route
              index
              element={
                <ProtectedRoute
                  Component={() => <PdfSection searchQuery={searchQuery} />}
                />
              }
            />
            <Route
              path="/:id"
              element={<ProtectedRoute Component={NotesPage} />}
            />
            <Route
              path="/postNotes"
              element={<ProtectedRoute Component={CreateNotes} />}
            />
            <Route
              path="/mynotes"
              element={<ProtectedRoute Component={MyNotes} />}
            />
            <Route
              path="/about"
              element={<ProtectedRoute Component={About} />}
            />
          </Route>
          <Route
            path="*"
            element={
              <>
                <h1>The Page You are looking for not found</h1>
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
