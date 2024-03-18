import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import Heading from "./Heading";

const SearchResults = () => {
  let { search } = useParams();

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkIcon, setBookmarkIcon] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
        );
        setSearchResults(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  const apiUrl = `https://api.airtable.com/v0/${process.env.URL_ID}/Table%201`;
  const authToken = `Bearer ${process.env.API_KEY}`;

  const handleBookmark = async () => {
    setBookmarkIcon(true);
    try {
      const response = await axios.post(
        apiUrl,
        {
          records: [
            {
              fields: {
                word: search,
                noun: `${JSON.stringify(searchResults)}`,
              },
            },
          ],
        },
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );
      setResponseData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="p-5 background">
      <div className="d-flex justify-content-between align-items-center">
        <Heading title={search} />

        {!bookmarkIcon ? (
          <FaRegBookmark
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
            onClick={handleBookmark}
          />
        ) : (
          <FaBookmark style={{ width: "30px", height: "30px" }} />
        )}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        searchResults &&
        searchResults[0]?.meanings.map((search, index) => {
          return (
            <div className="shadow-lg p-3 mb-5 bg-white rounded" key={index}>
              <Heading title={search?.partOfSpeech} />
              {search.definitions.map((def) => {
                return (
                  <>
                    <p>• {def.definition}</p>
                  </>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
};

export default SearchResults;
