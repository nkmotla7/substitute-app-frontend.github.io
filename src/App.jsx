import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ExcelUpload from "./Components/ExcelUploadComponent";
import TeacherList from "./Components/TeacherList";
import AbsentTeacherComponet from "./Components/AbsentTeacherComponent";
import SubstituteTable from "./Components/SubstituteTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ExcelUpload />}></Route>
          <Route path="/listTeachers" element={<TeacherList />}></Route>
          <Route
            path="/listAbsentList"
            element={<AbsentTeacherComponet />}
          ></Route>
          <Route path="/substituteList" element={<SubstituteTable />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
