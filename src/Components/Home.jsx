import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Vaqt } from "../rt/slice";

function Home() {
  const [Datas, setData] = useState([]);

  const navi = useNavigate();
  const [Sek, SetSek] = useState(120);
  const [Cat, SetCat] = useState(0);
  const [Diff, SetDiff] = useState(0);
  const [Type, SetType] = useState(0);
  const [numValue, SetnumValue] = useState(5);
  function Sekund(e) {
    SetSek(e.target.value);
  }
  function Category(e) {
    SetCat(e.target.value);
  }
  function Dif(e) {
    SetDiff(e.target.value);
  }
  function onType(e) {
    SetType(e.target.value);
  }
  function onNum(e) {
    SetnumValue(e.target.value);
  }
  const ca = useSelector((s) => s.date);
  const dist = useDispatch();
  useEffect(() => {
    async function Baza() {
      try {
        let data = await axios.get(
          `/api.php?amount=${numValue}&category=${Cat}&difficulty=${Diff}&type=${Type}`
        );
        if (data.status === 200) setData(data);
      } catch (error) {
        alert("Qandaydir muomo buldi!");
      }
    }
    Baza();
  }, [Cat, numValue, Diff, Type]);
  let laoding = Datas.data === undefined;
  const Local = JSON.stringify(Datas.data);
  function Submit() {
    localStorage.removeItem("Savol");
    localStorage.setItem("Savol", `${Local}`);
    navi("/Quiz");
    dist(Vaqt(Sek * 1));
  }
  return (
    <section className="container mx-auto border-2 border-black bg-transparent rounded row mt-4 py-4">
      <div className="col-12 col-lg-3">
        <img src="/logo.svg" alt="" />
      </div>
      <div className="col-12 col-lg-8">
        <h2>Ultimate Trivia Viktorina</h2>
        <hr />
        <div className="row gap-3 justify-content-start">
          <select
            value={Cat}
            onChange={Category}
            name="category"
            className="form-select"
          >
            <option disabled value="any">
              Any Category
            </option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">
              Entertainment: Japanese Anime &amp; Manga
            </option>
          </select>
          <select
            className="form-control"
            type="number"
            value={numValue}
            onChange={onNum}
          >
            {Array(50)
              .fill(1)
              .map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
          </select>
          {(numValue >= 51 && (
            <span className="text-red-600">
              Siz juda katta son kiritdingiz!
            </span>
          )) ||
            (numValue < 5 && (
              <span className="text-red-600">Savol kamida 5 bulishi kk!</span>
            ))}
          <select
            value={Diff}
            onChange={Dif}
            name="difficulty"
            className="form-select"
          >
            <option disabled value="any">
              Any Difficulty
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select
            value={Type}
            onChange={onType}
            name="type"
            className="form-select"
          >
            &gt;
            <option disabled value="any">
              Any Type
            </option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
          <div className="flex items-center ">
            <span className="flex-initial w-36">Test davomiyligi:</span>
            <input
              onChange={Sekund}
              className="form-control"
              type="number"
              placeholder="Sekund"
              value={Sek}
            />
          </div>
          {(Sek >= 2000 && (
            <span className="text-red-600">Juda uzun vaqt kiritildi!</span>
          )) ||
            (Sek < 5 && <span className="text-red-600">Juda qisqa vaqt!</span>)}
          <hr />
          <button
            onClick={Submit}
            disabled={
              laoding === true ||
              numValue < 4.99999999 ||
              numValue > 50.001 ||
              Sek < 5 ||
              Sek > 2000
            }
            className="bg-indigo-700 col-md-3 col-5 text-xl p-0 rounded text-white hover:bg-indigo-500"
          >
            {laoding ? (
              <i className="fa-solid fa-spinner  py-3 px-2 rounded"></i>
            ) : (
              <i className="fa-solid fa-play  py-3 px-3 rounded"></i>
            )}{" "}
            <span className="pr-3">Boshlash</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
