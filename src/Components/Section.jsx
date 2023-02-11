import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Next, Tugri } from "../rt/slice";

function Section() {
  const dist = useDispatch();
  const times = useSelector((s) => s.date.time);
  const Nextt = useSelector((s) => s.date.next);
  const Rost = useSelector((s) => s.date.true);
  
  const [value, setValue] = useState(times);
  const [RadioVal, setRadiOn] = useState([]);
  const [ve, setVe] = useState(new Date().getSeconds());

  (function time() {
    useEffect(() => {
      setInterval(() => setVe(new Date().getSeconds()), 1000);
    }, []);
    useEffect(() => {
      value >= 1 && setValue(value >= 1 && value - 1);
    }, [ve]);
  })();

  const next = (e) => {
    dist(Next(1));
    dist(Tugri(RadioVal*1));
  };
  function onRadio(e) {
    setRadiOn(e.target.value);
  }
  function Xato(e) {
    setRadiOn(e.target.value);
  }
  console.log(RadioVal);
  // { RadioVal && dist(Tugri(1))}
  let local = JSON.parse(localStorage.getItem("Savol"));
  let son = local.results[Nextt - 1];
  console.log(RadioVal);

  const Reverse = () => {
    window.location.replace("/");
  };
 
  function Finish() {
    
    setTimeout(() => {
      window.location.replace("/");
      alert(`  Siz testni muvaffaqiyatli tugaddingiz:
    Tugri javoblar:   ${Rost.togri}
    Natug'ri javoblar:   ${Rost.xat+1}
    Umuy ball:   ${(Rost.togri * 100) / local.results?.length}%
    `);
    },(1000));
  }

  return (
    <>
      <section className="container rounded border-2 border-black p-4 mt-9">
        {value === 0 && (
          <div className="cartEnd">
            <div className="cardEnd rounded">
              <i className="fa-regular fa-hand text-8xl text-red-700"></i>
              <h2 className="text-red-700">Sizning Vaqtingiz tugadi!</h2>
              <span>To'g'ri javoblar: {Rost.togri}</span>
              <span>Xato javoblar: {Rost.xat}</span>
              <span>
                Umuiy ball: {(Rost.togri * 100) / local.results?.length}%
              </span>
              <button
                onClick={Reverse}
                className="bg-red-700 text-xl p-0 w-50 rounded text-white hover:bg-red-500 p-3"
              >
                Bosh sahifaga qaytish
                <i className="fa-solid fa-clock-rotate-left ml-2"></i>
              </button>
            </div>
          </div>
        )}
        <div className="d-flex justify-between align-baseline">
          <div className="p-3 bg-slate-300 text-2xl">
            <i className="fa-solid fa-info text-2xl text-slate-300 py-2 px-3 bg-black rounded-full"></i>
            <span className="text-2xl">
              {local.results?.length} № {Nextt}
            </span>
          </div>
          <div className="bg-slate-300 px-3 py-3">
            <strong className="text-slate-300 rounded-full text-2xl px-2.5 py-3.5 bg-black">
              {value}
            </strong>
          </div>
        </div>
        <hr />
        <h2 dangerouslySetInnerHTML={{ __html: `${son.question}` }} />
        <div className="row p-4 g-3">
          <hr />
          <h5>Tog'ri javobni tanlang: </h5>
          <div className="flex gap-2 border-b-2 pb-3 hover:bg-dark">
            <input
              type="radio"
              id={son.correct_answer}
              name="savollar"
              onChange={onRadio}
              className="w-6"
              value={1}
            />
            <input
              className="d-none"
              onChange={() => {}}
              type="radio"
              name="savollar"
              checked={false}
            />
            <label className="text-2xl" htmlFor={son.correct_answer}>
              {son.correct_answer}
            </label>
          </div>
          {Array(son.incorrect_answers?.length)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex gap-2 border-b-2 pb-3 hover:bg-dark">
                <input
                  type="radio"
                  value={0}
                  onChange={Xato}
                  id={i}
                  name="savollar"
                  className="w-6"
                />
                <label
                  className="text-2xl"
                  htmlFor={i}
                  dangerouslySetInnerHTML={{
                    __html: `${son.incorrect_answers[i]}`,
                  }}
                />
              </div>
            ))}
        </div>
        <div className="flex  justify-between">
          {Nextt === local.results?.length ? (
            <></>
          ) : (
            <button
              onClick={Reverse}
              className="bg-red-700 text-xl p-0 rounded text-white hover:bg-red-500 p-3"
            >
              Qayta urinish
              <i className="fa-solid fa-clock-rotate-left ml-2"></i>
            </button>
          )}
          {Nextt === local.results?.length ? (
            <button
              onClick={Finish}
              className="bg-green-800 text-xl p-3 rounded text-white hover: bg-green-300"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i>
              Tugatish
            </button>
          ) : (
            <button
              disabled={Nextt === local.results?.length}
              onClick={next}
              className="bg-green-600 text-xl p-0 rounded text-white hover: bg-green-500 w-16 w-25"
            >
              Keyingi
              <i className="fa-solid fa-arrow-right ml-2"></i>
            </button>
          )}
        </div>
      </section>
    </>
  );
}

export default Section;
