import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import style from "./Print.module.css";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const Print = (props) => {
  const componentRef = useRef();
  const [wdth, setWidth] = useState("90%");
  const [mb, setMb] = useState("40px");
  const [mb1, setMb1] = useState("40px");
  const [user, setUser] = useState("");
  const [date, setDate] = useState(
    `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`
  );
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "test",
  });
  const [id, setId] = useState(useParams().id);
  ///  let id = "6473ebcd8b5f100889736829";
  const [data, setMyData] = useState(null);
  useEffect(() => {
    let token = Cookies.get("auth");
    if (!token) window.location.replace("/");

    setUser(jwtDecode(token).fullName);
    if (props.husbandName || props.fullName) {
      setMyData({ husbandName: props.husbandName, fullName: props.fullName });
    } else {
      let get = async () => {
        let res = await fetch(`https://adventurous-erin-long-johns.cyclic.app/form/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        });

        if (res.status == 200) {
          res = await res.json();
          setMyData(res);
        }
      };
      get();
    }
  }, []);
  const handelClick = async (e) => {
    e.preventDefault();
    let token = Cookies.get("auth");
    let res = await axios.post(
      "https://adventurous-erin-long-johns.cyclic.app/form/create",
      {
        fullName: props.fullName,
        husbandName: props.husbandName,
      },
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    if (res.status == 200) {
      //   res = await res.json()
      setId(res.data);

      //window.location.replace("/forms");
    } else {
      // window.location.reload();
    }
  };
  if (!data) return <div className={style.loader}></div>;
  return (
    <>
      <div className={style.nav}>
        <button
          onClick={() => {
            window.location.replace("/forms");
          }}
        >
          X
        </button>
        <div>
          <h2>{data.fullName}</h2>
        </div>
      </div>
      <div className={style.tmp}></div>
      <div className={style.topContainer}>
        <div
          ref={componentRef}
          className={style.toPrint}
          style={{ width: wdth }}
          name={id}
        >
          <div className={style.top}>
            <div className={style.topW}>
              <div>
                {" "}
                {data.formNumber
                  ? `رقم الاستماره / ${data.formNumber}`
                  : `/ رقم الاستماره`}
              </div>
              <div> / العدد</div>
              <div> / التاريخ</div>
            </div>
            <div>
              <img src="https://res.cloudinary.com/dbymvhk8x/image/upload/v1685471180/image-525acf9e29b89e9cdea769d5d8c0ef1b8720823e_g8nzze.png"></img>
            </div>
            <div className={style.topW}>
              <div> مديرية بلدية السماوة</div>
              <div> شعبة التخطيط والمتابعة</div>
              <div> وحدة نظم المعلومات</div>
            </div>
          </div>
          <hr
            style={{
              width: "90%",
              border: "1.5px solid black",
              marginBottom: "30px",
            }}
          ></hr>
          <div className={style.head}>
            <div style={{ marginBottom: "20px" }}>م/ بيان استفادة</div>
            <div style={{ marginBottom: "50px" }}>
              :لدى الفحص و التدقيق في برنامج ادخال المستفيدين تبين مايلي
            </div>
          </div>
          <div className={style.tabl}>
            <div className={style.def}>
              <div>
                {" "}
                {data.motherName
                  ? `اسم الام / ${data.motherName}`
                  : `/ اسم الام`}
              </div>
              <div>
                {" "}
                {data.fullName
                  ? ` مقدم الطلب / ${data.fullName}`
                  : `/ مقدم الطلب`}{" "}
              </div>
            </div>
            <div style={{ padding: "10px", borderLeft: ".5px solid black" }}>
              {data.husbandName
                ? `اسم الزوج / ${data.husbandName}`
                : `/ اسم الزوج`}
            </div>

            <div className={style.def}>
              <div>
                {" "}
                {data.addressNubmer
                  ? `رقم المقاطعه / ${data.addressNubmer}`
                  : `/ رقم المقاطعه`}
              </div>
              <div>
                {" "}
                {data.pieceNumber
                  ? `رقم القطعه / ${data.pieceNumber}`
                  : `/ رقم القطعه`}
              </div>
            </div>
            <div className={style.def}>
              <div>
                {" "}
                {data.department ? `الشريحه / ${data.department}` : `/ الشريحه`}
              </div>
              <div>
                {" "}
                {data.assignDate
                  ? `تاريخ التخصيص / ${data.assignDate?.slice(0, 10)}`
                  : `/ تاريخ التخصيص`}
              </div>
            </div>
            <div style={{ padding: "10px", borderLeft: ".5px solid black" }}>
              {" "}
              موقف مقدم الطلب / {data.beneficiary ? "مستفيد" : "غير مستفيد"}
            </div>
          </div>
          <p className={style.notice} style={{ marginBottom: mb1 }}>
            {" "}
            المعلومات أعلاه تخص الحدود الادارية لمديريتنا ولغاية تاريخ تنظيم
            الاستمارة ونحن غير مسؤولين عن استفادتهم في بلديات المثنى لفك
            ارتباطها من مديريتنا و اي حالة تمليك أخرى لانه من اختصاص مديرية
            التسجيل العقاري في المثنى{" "}
          </p>
          <p className={style.notice} style={{ marginBottom: mb }}>
            في حالة استفادة الموما اليه أعلاه و عدم ذكره ضمن قاعدة البيانات
            يتحمل المستفيد كافة التبعات القانونية بحسب المادة ثالثا من قرار 120
            لسنة 2012
          </p>
          <div className={style.qr}>
            <QRCode
              value={`${window.location.hostname}/form/show/${id}`}
              style={{ height: "100px" }}
            />
          </div>
          <div className={style.footer}>
            <div>{user}</div>
            <div>اسم الموظف المسوؤل</div>
            <div>{date}</div>
          </div>
        </div>
        <div className={style.Scontainer}>
          <h3 style={{ lineHeight: "20px", textDecoration: "underline" }}>
            المعلومات الاساسية
          </h3>
          <div>{data.fullName ? `الاسم : ${data.fullName}` : `: الاسم`}</div>
          <div>
            {data.husbandName
              ? ` اسم الزوج : ${data.husbandName}`
              : `: اسم الزوج`}
          </div>
          <div>
            {" "}
            {data.motherName
              ? `اسم الام : ${data.motherName}`
              : `: اسم الام`}{" "}
          </div>
          <div>
            {" "}
            {data.assignDate
              ? `تاريخ التخصيص : ${data.assignDate?.slice(0, 10)}`
              : `: تاريخ التخصيص`}
          </div>
          <div> {data.area ? ` المساحه : ${data.area}` : `: المساحه`}</div>
          <div>
            {" "}
            {data.addressNubmer
              ? ` المقاطعة : ${data.addressNubmer}`
              : `: المقاطعة`}{" "}
          </div>
          <div>
            {data.pieceNumber
              ? `  رقم القطعة : ${data.pieceNumber}`
              : `:  رقم القطعة`}
          </div>
          <div>
            {" "}
            {data.recordNumber
              ? ` رقم السجل : ${data.recordNumber}`
              : `: رقم السجل`}{" "}
          </div>
          <div>
            {data.paperNumber
              ? ` رقم الصحيفة : ${data.paperNumber}`
              : `: رقم الصحيفة`}{" "}
          </div>
          <div>
            {data.department ? ` الشريحة : ${data.department}` : `: الشريحة`}{" "}
          </div>
          <div>
            {" "}
            {data.birthDate
              ? ` المواليد : ${data.birthDate?.slice(0, 10)}`
              : `: المواليد`}{" "}
          </div>
          <div>
            {" "}
            {data.birthPlace
              ? ` مسقط الراس : ${data.birthPlace}`
              : `: مسقط الراس`}
          </div>
          <div>
            {data.formNumber
              ? ` رقم الاستمارة : ${data.formNumber}`
              : `: رقم الاستمارة `}{" "}
          </div>
          <div> موقف المقدم : {data.beneficiary ? "مستفيد" : "غير مستفيد"}</div>
          <div>تاريخ الانشاء : {date}</div>
          {props.fullName || props.husbandName ? (
            <button
              onClick={id ? handelPrint : handelClick}
              style={{ fontWeight: "bold" }}
            >
              {" "}
              {!id ? "طباعة + انشاء" : "طباعه"}
            </button>
          ) : (
            <button onClick={handelPrint} style={{ fontWeight: "bold" }}>
              طباعة
            </button>
          )}
        </div>
      </div>
    </>
  );
};
