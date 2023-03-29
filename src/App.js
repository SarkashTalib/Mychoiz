import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Category from "./pages/Category";
import Article from "./pages/Article";

import NavBar from "./components/layouts/NavBar";
import Footer from "./components/layouts/Footer";


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const client = new ApolloClient({
  uri: `${BACKEND_URL}/graphql`,
  cache: new InMemoryCache()
});

function App() {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <ApolloProvider client={client}>
          <NavBar />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/article/:slug" element={<Article />} />
            <Route path="/category/:id" element={<Category />} />

            <Route path="*" element={<p className="text-center text-red-400">Unfound url</p>} />

          </Routes>
          <Footer />
        </ApolloProvider>
      </React.StrictMode>
    </BrowserRouter>
  );
}

export default App;