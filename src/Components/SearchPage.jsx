import React, { useState } from "react";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  console.log(search);

  const handleRedirect = () => {
    navigate(`/search-results/${search}`);
  };

  return (
    <div className="p-2">
      <h2>Dictionary</h2>
      <p>Find meanings and save for quick reference</p>
      <div>
        <Search value={search} setValue={setSearch} />
      </div>
      <button className="btn btn-primary mt-2" onClick={handleRedirect}>
        Search
      </button>
      <div className="mt-2">
        <button className="btn btn-success" onClick={()=>navigate("/bookmarks")}>Bookmark List</button>
      </div>
    </div>
  );
};

export default SearchPage;
