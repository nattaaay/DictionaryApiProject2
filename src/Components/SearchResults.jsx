import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaBookmark } from "react-icons/fa6";

const SearchResults = () => {
  let { search } = useParams();

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("params", search);

  useEffect(() => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`)
      .then((res) => {
        //   console.log(res);
        setSearchResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  //   console.log("hello", searchResults[0]?.meanings);

  return (
    <div className="p-2">
      <div className="d-flex justify-content-between align-items-center">
      <h2>{search}</h2>
      <FaBookmark style={{width:"30px",height:"30px"}}/>

      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        searchResults &&
        searchResults[0]?.meanings.map((search) => {
          return (
            <div class="shadow-lg p-3 mb-5 bg-white rounded">
              <h2>{search.partOfSpeech}</h2>
              {search.definitions.map((def) => {
                return <p>• {def.definition}</p>;
              })}
            </div>
          );
        })
      )}
    </div>
  );
};

export default SearchResults;
