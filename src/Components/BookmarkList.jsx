//list of bookmarks
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookmarkList = () => {
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

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

  return (
    <div className="background">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="background">
          <p id="firstHeading">Click on the word to view more! </p>
          <br />
          <br />
          <br />
          {responseData.map((e) => (
            <div className="list">
              <div key={e.id}>
                <Link to={`/bookmarks-result/${e.id}`}>{e.fields.word}</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkList;
