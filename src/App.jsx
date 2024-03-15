import React, { useState, useEffect } from 'react';
import SearchPage from "./Components/SearchPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchResults from "./Components/SearchResults";
import BookmarkList from "./Components/BookmarkList";
import axios from 'axios';
import BookmarkResults from './Components/BookmarkResults';
import SearchHistory from './Components/SearchHistory';
import SearchHistoryResults from './Components/SearchHistoryResults';


function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<SearchPage />} />
          <Route path="/search-results/:search" element={<SearchResults />} /> 
          <Route path="/bookmarks" element={<BookmarkList />} />   //here is the 1st route fetch
          <Route path="/bookmarks-result/:id" element={<BookmarkResults />} /> //here is the 1st route post
          <Route path="/search-history" element={<SearchHistory />} /> //here is the 2nd route fetch
          <Route path="/search-history-result/:id" element={<SearchHistoryResults />} /> //here is the 2nd route post
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
