import React, { useState } from "react";
import style from "./Login.module.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const handelSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("https://adventurous-erin-long-johns.cyclic.app/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    });
    console.log(res.status);
    let token = await res.json();
    if (res.status == 200) {
      console.log(token.token);
      Cookies.set("auth", token.token);
      window.location.replace("/forms");
    } else {
      //     console.log(res.data);
      //  window.location.reload()
    }
  };
  return (
    <>
      <div className={style.right}>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <div className={style.description}>
            <h4 style={{ fontSize: "25px" }}>مديرية بلدية السماوة</h4>
            <h6 className={style.H6}>وحدة نظم المعلومات</h6>
          </div>
          <img
            className={style.logo}
            src="https://res.cloudinary.com/dbymvhk8x/image/upload/v1685471180/image-525acf9e29b89e9cdea769d5d8c0ef1b8720823e_g8nzze.png"
          ></img>
        </div>
        <a
          target="_wp"
          href="https://wa.me/17712204921"
          className={style.whats}
        >
          <div>التواصل مع الدعم</div>
          <div>
            <i className="fa fa-whatsapp" style={{ width: "25px" }}></i>{" "}
            +1&nbsp;(771)&nbsp;220‑4921
          </div>
        </a>
      </div>

      <div className={style.middel}>
        <img
          src="https://res.cloudinary.com/dbymvhk8x/image/upload/v1684888481/erp_xeqat5.png"
          className={style.image3}
        />
        <form className={style.rightM} onSubmit={handelSubmit}>
          <img src="https://res.cloudinary.com/dbymvhk8x/image/upload/v1684896124/lock_vxwiql.png" />
          <h4>!اهلا بك من جديد</h4>
          <input
            type="text"
            className={style.inputform}
            placeholder="الحساب"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          ></input>
          <input
            type="password"
            className={style.inputform}
            placeholder="الرمز السري"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            style={{ marginTop: "10px" }}
          ></input>
          <button type="submit">تسجيل الدخول</button>
        </form>
      </div>
      <div className={style.container}>
        <form className={style.secondForm} onSubmit={handelSubmit}>
          <img src="https://res.cloudinary.com/dbymvhk8x/image/upload/v1684896124/lock_vxwiql.png" />
          <h4>!اهلا بك من جديد</h4>
          <input
            type="text"
            className={style.inputform}
            placeholder="الاسم"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          ></input>
          <input
            type="password"
            className={style.inputform}
            placeholder="الرمز السري"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            style={{ marginTop: "10px" }}
          ></input>
          <button type="submit">تسجيل الدخول</button>
          <a
            target="_wp"
            href="https://wa.me/17712204921"
            className={style.whats}
          >
            <div>التواصل مع الدعم</div>
            <div>
              <i className="fa fa-whatsapp" style={{ width: "25px" }}></i>{" "}
              +1&nbsp;(771)&nbsp;220‑4921
            </div>
          </a>
        </form>
      </div>
    </>
  );
};

export default Login;
