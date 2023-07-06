import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Auth/Login";
import { Nav } from "./components/Nav/Nav";
import { SideBar } from "./components/SideBar/SideBar";
import { Lists } from "./components/Lists/Lists";
import { AddForm } from "./components/addForm/AddForm";
import Class from "./components/classes/Class";
import { Logs } from "./components/logs/Logs";
import { Logo } from "./components/Logo/Logo";
import { Profile } from "./components/profile/Profile";
import { Modal } from "./components/modal/Modal";
import { Users } from "./components/users/Users";
import { EditForm } from "./components/editForm/EditForm";
import { Print } from "./components/printForm/Print";
import { ShowBook } from "./components/showBook/ShowBook";
import {
  Routes,
  BrowserRouter,
  Route,
  useBeforeUnload,
} from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";
import Cookies from "js-cookie";
import { Database } from "./components/test/Database";

export const Context = createContext(null);

function App() {
  // رقم معرف	الاسم الكامل	مسقط الراس	المواليد	الشريحه	اسم الزوج	رقم السجل	رقم الصحيفه	دائرة الاحوال	رقم القطعه	المقاطعه	المساحه	تاريخ التخصيص
  
  return (
    <>
       <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/forms" element={<Lists />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/form/add" element={<AddForm />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/classes" element={<Class />} />
        <Route exact path="/logo" element={<Logo />} />
        <Route exact path="/form/edit/:id" element={<EditForm />} />
        <Route exact path="/logs" element={<Logs />} />
        <Route exact path="/form/print/:id" element={<Print />} />
        <Route exact path="/form/show/:id" element={<ShowBook />} />
        <Route exact path="/smv-database" element={<Database/>}/>
      </Routes> 
      
      
    </>
  );
}

export default App;
