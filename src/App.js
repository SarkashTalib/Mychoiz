import Home from "./pages/Home";
import Cinema from "./pages/Cinema";
import Nature from "./pages/Nature";
import Software from "./pages/Software";
import Vacation from "./pages/Vacation";
import Travel from "./pages/Travel";
import Adventure from "./pages/Adventure";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import{ BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cinema" element={<Cinema />} />
        <Route path="/Nature" element={<Nature />} />
        <Route path="/Software" element={<Software />} />
        <Route path="/Vacation" element={<Vacation />} />
        <Route path="/Travel" element={<Travel />} />
        <Route path="/Adventure" element={<Adventure />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
