import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Category from "./pages/Category";

// import Cinema from "./pages/Cinema";
// import Nature from "./pages/Nature";
// import Software from "./pages/Software";
// import Vacation from "./pages/Vacation";
// import Travel from "./pages/Travel";
// import Adventure from "./pages/Adventure";

import Article from "./pages/Article";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";


const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
  cache: new InMemoryCache()
})

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/cinema" element={<Cinema />} />
          <Route path="/nature" element={<Nature />} />
          <Route path="/software" element={<Software />} />
          <Route path="/vacation" element={<Vacation />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/adventure" element={<Adventure />} /> */}

          <Route path="/article/:id" element={<Article />} />
          <Route path="/category/:id" element={<Category />} />
        </Routes>
        <Footer />
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
