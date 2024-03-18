//list of bookmarks
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchHistory = () => {
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

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
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="background">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="row list">
          <p id="firstHeading">Your search history... </p>
          <br />
          <br />
          <br />
          {responseData
            .slice()
            .reverse()
            .map((e) => (
              <div className="list">
                <div key={e.id}>
                  •
                  <Link to={`/search-history-result/${e.id}`}>
                    {e.fields.name}
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchHistory;
