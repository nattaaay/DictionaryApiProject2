import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BookmarkResults = () => {
  let { id } = useParams();

  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Changed to null to represent no error

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.airtable.com/v0/${process.env.URL_ID}/Table%201?maxRecords=50&view=Grid%20view`,
          {
            headers: {
              Authorization: `Bearer ${process.env.API_KEY}`,
            },
          }
        );
        setResponseData(response.data.records);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Check if responseData is not empty before accessing it
  const results = responseData.length && responseData.find((e) => e.id === id);

  let parseData = [];
  // Check if results is not null or undefined before parsing
  if (results && results.fields && results.fields.noun) {
    parseData = JSON.parse(results.fields.noun);
  }

  // console.log("hello", parseData);

  return (
    <div className="p-2 background shadow-lg p-3 mb-5 bg-white rounded">
      <div>
        {loading
          ? "Loading..."
          : error
          ? "Error occurred"
          : parseData && parseData.length > 0
          ? parseData[0]?.meanings.map((search) => (
              <div
                key={search.partOfSpeech}
                className="shadow-lg p-3 mb-5 bg-white rounded"
              >
                <h2>{search.partOfSpeech}</h2>
                {search.definitions.map((def, index) => (
                  <p key={index}>• {def.definition}</p>
                ))}
              </div>
            ))
          : "No results found"}
      </div>
    </div>
  );
};

export default BookmarkResults;
