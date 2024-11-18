import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Details from "./pages/details";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<Details />} />
        <Route path="*" element= {<Navigate to='/'/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
