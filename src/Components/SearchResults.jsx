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
  }, [search]); // Include search parameter here

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
            // Cookie:
            //   "brw=brwKZl8aJarB2k2SF; brwConsent=opt-out; AWSALB=UspS+xJvYfq08bB2gTJ28BfqpBJhyMrSmoZOuhBBz0EyEr96a7BtP5VB6+9s1qMVPWndfFZ+J/PzyKOOGesKB7cN505kJBE0WThshWw71EJU0FNmRg9zD8KcEOmd; AWSALBCORS=UspS+xJvYfq08bB2gTJ28BfqpBJhyMrSmoZOuhBBz0EyEr96a7BtP5VB6+9s1qMVPWndfFZ+J/PzyKOOGesKB7cN505kJBE0WThshWw71EJU0FNmRg9zD8KcEOmd",
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
        {/* <h2>{search}</h2> */}
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
              {/* <h2>{search.partOfSpeech}</h2> */}
              <Heading title={search?.partOfSpeech} />
              {search.definitions.map((def) => {
                return (
                  <>
                    {/* <h2>Definition</h2> */}
                    <p>• {def.definition}</p>
                    {/* <h2>Example</h2>
                    <p>{def.example}</p> */}
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
