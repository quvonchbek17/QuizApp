import { useState } from 'react'
import Headers  from "./Components/Headers";
import Home from './Components/Home';
import { Route, Routes } from "react-router-dom";
import Section from './Components/Section';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Headers/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/Quiz" element={<Section/>}></Route>
    </Routes>
    </>
  )
}

export default App
