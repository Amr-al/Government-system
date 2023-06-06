import React, { useContext, useEffect, useState } from "react";
import style from "./Lists.module.css";
import Cookies from "js-cookie";
import { Nav } from "../Nav/Nav";
import jwtDecode from "jwt-decode";
import { Print } from "../printForm/Print";
import { DeleteModal } from "../deleteModal/DeleteModal";
import axios from "axios";
export const Lists = (props) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [all, setAll] = useState(null);
  const [searchType, setType] = useState("");
  const [searchValue, setValue] = useState("");
  const [search, setSearch] = useState({});
   const [num, setNum] = useState(0);
  const [currentPage, setCur] = useState(1);
  const [check, setCheck] = useState(false);
  const [clk, setClk] = useState(false);
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState(null);
  const [husbandName, sethusbandName] = useState(null);
  console.log(num);

  useEffect(() => {
    let token = Cookies.get("auth");
    if (!token) window.location.replace("/");
    setUser(jwtDecode(token));
    const get = async () => {
      axios
        .get("https://adventurous-erin-long-johns.cyclic.app/form/?page=1 ", {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        .then((res) => {
          setData(res.data.data);
          setAll(res.data.data);
          setNum(res.data.len);
          localStorage.setItem('num',res.data.len)
        });

      // if (res.status == 200) {
      //   res = await res.json();

      // } else {
      // }
    };
    get();
  }, []);

  // const handelDelete = async (id) => {
  //   let token = Cookies.get("auth");
  //   let res = await fetch(
  //     `https://adventurous-erin-long-johns.cyclic.app/form/delete/${id}`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `token ${token}`,
  //       },
  //     }
  //   );
  //   if (res.status == 200) {
  //     window.location.reload();
  //   } else {
  //   }
  // };
  let token = Cookies.get("auth");
  const handelSubmit = async (e) => {
    e.preventDefault();
    setCur(1);
    axios
      .post(
        "https://adventurous-erin-long-johns.cyclic.app/form/front/?page=1",
        {
           search,
        }
      )
      .then((res) => {
        setData(res.data);
      });
    // let res = await fetch(`http://127.0.0.1:8000/form/filter/?page=${currentPage}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `token ${token}`,
    //   },
    //   body: JSON.stringify({
    //     searchType,
    //     searchValue,
    //   }),
    // });
    // if (res.status == 200) {
    //   res = await res.json();
    //   setData(res);
    // } else {
    // }
  };

  const handelNext = async () => {
    // let res = await fetch(
    //   `http://127.0.0.1:8000/form/?page=${currentPage + 1}&limit=30`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: `token ${token}`,
    //     },
    //   }
    // );
    // let stats = res.status
    // res = await res.json();
    // if (stats == 200 && res.length) {
    //   setData(res);
    //   setLen(res.length);
    //   setCur((prev) => prev + 1);
    // } else {
    //   console.log(res);
    // }
    axios
      .post(
        `https://adventurous-erin-long-johns.cyclic.app/form/front/?page=${currentPage+1}`,
        {
           search,
        }
      )
      .then((res) => {
        if (res.data.length) {
          setCur((pre) => pre + 1);
          setData(res.data);
        }
      });
  };
  const handelPrev = async () => {
    if (currentPage == 1) return;
    // let res = await fetch(
    //   `http://127.0.0.1:8000/form/?page=${currentPage - 1}&limit=30`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: `token ${token}`,
    //     },
    //   }
    // );
    // let stats = res.status;
    // res = await res.json();
    // if (stats == 200 && res.length) {
    //   setData(res);
    //   setLen(res.length);
    //   setCur((prev) => prev - 1);
    // } else {
    // }

    axios
      .post(
        `https://adventurous-erin-long-johns.cyclic.app/form/front/?page=${
          currentPage - 1
        }`,
        {
           search,
        }
      )
      .then((res) => {
        if (res.data.length) {
          setCur((pre) => pre - 1);
          setData(res.data);
        }
      });
  };

  if (!data || !user) return <div className={style.loader}></div>;
  return check ? (
    <Print husbandName={husbandName} fullName={fullName}></Print>
  ) : (
    <>
      <Nav name="الارشيف" number={num} />
      <div className={style.Lcontainer}>
        <form onSubmit={handelSubmit}>
          <button type="submit">
            <i className="fa fa-arrow-circle-left"></i>
          </button>
          <input
            type={"text"}
            placeholder="اسم الزوج"
            name="husbandName"
            onChange={(e) => {
              setSearch(e.target.value);
              sethusbandName(e.target.value);
               handelSubmit(e)
            }}
          />
          <input
            type={"text"}
            placeholder="اسم مقدم الطلب"
            name="fullName"
            onChange={(e) => {

              setSearch(e.target.value);
              setFullName(e.target.value);
               handelSubmit(e)

            }}
          ></input>
        </form>
        <div className={style.girdTable}>
          <div className={style.girdItem}>الاجراء </div>
          <div className={style.girdItem}>رقم الاستماره</div>
          <div className={style.girdItem}>الشريحه</div>
          <div className={style.girdItem}>تاريخ التخصيص</div>
          <div className={style.girdItem}>دائره الاحوال </div>
          <div className={style.girdItem}>رقم المقاطعة</div>
          <div className={style.girdItem}>رقم القطعه</div>
          <div className={style.girdItem}>الاسم </div>
          <div className={style.girdItem}>#</div>
        </div>
        {data.map((data, index) => {
          return (
            <>
              <div className={style.girdTable2}>
                <div
                  className={style.girdItem2}
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginLeft: "15px",
                  }}
                >
                  {(user.admin || user.role.includes("delete")) && (
                    <i
                      className="fa fa-trash"
                      style={{ fontSize: "1.2rem", cursor: "pointer" }}
                      onClick={() => {
                        setId(data._id);
                        setClk(true);
                      }}
                    ></i>
                  )}
                  {(user.admin || user.role.includes("edit")) && (
                    <i
                      className="fa fa-edit"
                      style={{
                        color: "blue",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        window.location.replace(`/form/edit/${data._id}`);
                      }}
                    ></i>
                  )}

                  <i
                    className="fa fa-eye"
                    style={{ fontSize: "1.2rem", cursor: "pointer" }}
                    onClick={() => {
                      window.location.replace(`/form/print/${data._id}`);
                    }}
                  ></i>
                </div>
                <div className={style.girdItem2}>
                  {" "}
                  {data.formNumber ? data.formNumber : "null"}
                </div>
                <div
                  className={style.girdItem2}
                  style={{ textAlign: "center" }}
                >
                  {data.classType ? data.classType : "null"}
                </div>

                <div className={style.girdItem2}>
                  {" "}
                  {data.assignDate ? data.assignDate.slice(0, 10) : "null"}{" "}
                </div>
                <div className={style.girdItem2}>
                  {data.department ? data.department : "null"}
                </div>
                <div className={style.girdItem2}>
                  {" "}
                  {data.addressNubmer ? data.addressNubmer : "null"}{" "}
                </div>
                <div className={style.girdItem2}>
                  <div>{data.pieceNumber ? data.pieceNumber : "null"}</div>
                  <h5>
                    <i>المساحة : {data.area ? data.area : " "}</i>
                  </h5>
                </div>
                <div className={style.girdItem2}>
                  <div> {data.fullName}</div>{" "}
                  {!data.beneficiary && (
                    <p
                      style={{
                        backgroundColor: "yellow",
                        fontWeight: "600",
                        width: "80%",
                        margin: "auto",
                        borderRadius: "10px",
                        marginTop: "10px",
                      }}
                    >
                      غير مستفيد
                    </p>
                  )}
                  <h5>
                    <i>
                      اسم الزوج : {data.husbandName ? data.husbandName : ""}
                    </i>
                  </h5>
                </div>
                <div className={style.girdItem2}>{index + 1}</div>
              </div>
              {index != num - 1 ? <hr style={{ width: "100%" }}></hr> : <></>}
            </>
          );
        })}
        {data.length == 0 && (husbandName || fullName) && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className={style.tba3a}
              onClick={() => {
                setCheck(true);
              }}
            >
              {" "}
              طباعة كتاب غير مستفيد{" "}
            </button>
          </div>
        )}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className={style.pagination}>
            <button onClick={handelPrev}>&laquo;</button>
            <button>{currentPage}</button>

            <button onClick={handelNext}>&raquo;</button>
          </div>
        </div>
      </div>
      {clk && <DeleteModal setClk={setClk} id={id} />}
    </>
  );
};
