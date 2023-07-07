import React, { useEffect, useState } from "react";
import style from "./SideBar.module.css";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
export const SideBar = () => {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [width, setWidth] = useState("60px");
  const [hide, setHide] = useState("none");
  const handelclick = () => {
    setShow(!show);
  };
  const handelWidht = () => {
    setWidth(width == "250px" ? "80px" : "250px");
    setHide(hide == "inline" ? "none" : "inline");
  };
  useEffect(() => {
    let token = Cookies.get("auth");
    if (!token) window.location.replace("/");
    setUser(jwtDecode(token));
  }, []);
  if (!user) return <></>;
  return (
    <div className={style.Scontainer} style={{ width: width }}>
      <div
        className={style.section}
        style={{ borderTopLeftRadius: "20px" }}
        onClick={handelWidht}
      >
        <i
          className="fa fa-angle-double-right"
          style={{
            color: "white",
            fontSize: "30px",
            marginRight: "40%",
            padding: "10px 0px 10px 0px",
          }}
        ></i>
      </div>
      <a
        className={style.section}
        onClick={() => {
          window.location.replace("/forms");
        }}
      >
        <h1 style={{ color: "white", fontSize: "20px" }}>
          <b style={{ marginRight: "20px", display: hide }}>الاسـتمارات</b>
          <i
            className="fa fa-archive"
            style={{ color: "white", fontSize: "20px", marginRight: "20px" }}
          ></i>
        </h1>
      </a>

      {(user.admin || user.role.includes("add")) && (
        <>
          <a
            className={style.section}
            onClick={() => {
              window.location.replace("/form/add");
            }}
          >
            <h1 style={{ color: "white", fontSize: "20px" }}>
              <b style={{ marginRight: "20px", display: hide }}>
                اضافه استماره
              </b>
              <i
                className="fa fa-plus"
                style={{
                  color: "white",
                  fontSize: "20px",
                  marginRight: "20px",
                }}
              ></i>
            </h1>
          </a>
        </>
      )}
      <a
        className={style.section}
        onClick={() => {
          window.location.replace("/logs");
        }}
      >
        <h1 style={{ color: "white", fontSize: "20px" }}>
          <b style={{ marginRight: "20px", display: hide }}>Logs System</b>
          <i
            className="fa fa-history"
            style={{
              color: "white",
              fontSize: "20px",
              marginRight: "20px",
            }}
          ></i>
        </h1>
      </a>
      {(user.admin || user.role.includes("setting")) && (
        <>
          <a className={style.setting} onClick={handelclick}>
            <h1
              className="fa fa-angle-down"
              style={{
                fontSize: "20px",
                color: "white",
                marginRight: "20%",
                marginTop: "8%",
                display: hide,
              }}
            ></h1>
            <h1 style={{ color: "white", fontSize: "20px" }}>
              <b style={{ marginRight: "20px", display: hide }}>الاعدادات</b>
              <i
                className="fa fa-gear fa-spin"
                style={{ fontSize: "20px", marginRight: "17px" }}
              ></i>
            </h1>
          </a>
          <div
            className={style.dropdown}
            style={{
              backgroundColor: "white",
              display: show ? "block" : "none",
            }}
          >
            <a
              className={style.section}
              onClick={() => {
                window.location.replace("/classes");
              }}
            >
              <h1 style={{ color: "white", fontSize: "20px" }}>
                <b style={{ marginRight: "20px", display: hide }}>تصنيفات</b>
                <i
                  className="fa fa-check-square"
                  style={{ fontSize: "20px", marginRight: "17px" }}
                ></i>
              </h1>
            </a>

            <a
              className={style.section}
              onClick={() => {
                window.location.replace("/users");
              }}
            >
              <h1 style={{ color: "white", fontSize: "20px" }}>
                <b style={{ marginRight: "20px", display: hide }}>الموظفين</b>
                <i
                  className="fa fa-users"
                  style={{ fontSize: "20px", marginRight: "17px" }}
                ></i>
              </h1>
            </a>

            <a
              className={style.section}
              onClick={() => {
                window.location.replace("/logo");
              }}
            >
              <h1 style={{ color: "white", fontSize: "20px" }}>
                <b style={{ marginRight: "20px", display: hide }}>العامه</b>
                <i
                  className="fa fa-columns"
                  style={{ fontSize: "20px", marginRight: "17px" }}
                ></i>
              </h1>
            </a>

            <a
              className={style.section}
              onClick={() => {
                window.location.replace("/smv-database");
              }}
            >
              <h1 style={{ color: "white", fontSize: "20px" }}>
                <i
                  className="fa fa-database"
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginRight: "20px",
                  }}
                ></i>
              </h1>
            </a>
          </div>
        </>
      )}
    </div>
  );
};
