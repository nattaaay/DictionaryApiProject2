import React from "react";

const Search = ({ value, setValue }) => {
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
};

export default Search;
