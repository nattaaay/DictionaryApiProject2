//list of bookmarks
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_KEY, URL_ID } from "../Constant/Constant";

const BookmarkList = () => {
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.airtable.com/v0/${URL_ID}/Table%201?maxRecords=10&view=Grid%20view`,
          {
            headers: {
              Authorization:
                `Bearer ${API_KEY}`,
              Cookie:
                "brw=brwKZl8aJarB2k2SF; brwConsent=opt-out; AWSALB=B37s8RmZk3j8TpJ5hI11Egg++sMXV4Jm+mB25MISUhp3T5ohX+xhEK18vpMUY4THhhHZu/GVhutpv4cIWLiW7HVaYXLSpG1lwUQmlW3T1aqQeuI6YJoOJeLy1H+r; AWSALBCORS=B37s8RmZk3j8TpJ5hI11Egg++sMXV4Jm+mB25MISUhp3T5ohX+xhEK18vpMUY4THhhHZu/GVhutpv4cIWLiW7HVaYXLSpG1lwUQmlW3T1aqQeuI6YJoOJeLy1H+r",
            },
          }
        );
        setResponseData(response.data.records);
        // console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // console.log(responseData.map((e) => JSON.parse(e.fields.noun)));

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="p-2">
          {responseData.map((e) => (
            <p key={e.id}>
              <Link to={`/bookmarks-result/${e.id}`}>{e.fields.word}</Link>
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default BookmarkList;
