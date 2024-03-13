import React, { useState } from "react";
import SearchPage from "./Components/SearchPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchResults from "./Components/SearchResults";
import BookmarkList from "./Components/BookmarkList";

function App() {
  //first we have to call an api   axios
  //then redirect to a new page    react router dom library

  //we use react-router-dom

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<SearchPage />} />
          <Route path="/search-results/:search" element={<SearchResults />} />
          <Route path="/bookmarks" element={<BookmarkList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
