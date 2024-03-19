import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SearchHistoryResults = () => {
  let { id } = useParams();

  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Changed to null to represent no error

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.airtable.com/v0/${process.env.URL_ID_TWO}/Table%201?maxRecords=50&view=Grid%20view`,
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
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Check if responseData is not empty before accessing it
  const results = responseData.length && responseData.find((e) => e.id === id);

  let parseData = [];
  // Check if results is not null or undefined before parsing
  if (results && results.fields && results.fields.data) {
    parseData = JSON.parse(results.fields.data);
  }

  return (
    <div className="p-2 background">
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default SearchHistoryResults;
