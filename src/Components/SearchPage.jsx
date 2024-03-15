import React, { useState } from "react";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_KEY, URL_ID_TWO } from "../Constant/Constant";

const SearchPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRedirect = () => {
    if (!search) {
      alert("please insert value");
      return;
    }
    setLoading(true);

    const apiUrl = `https://api.airtable.com/v0/${URL_ID_TWO}/Table%201`;
    const authToken =
      `Bearer ${API_KEY}`;

    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`)
      .then(async (res) => {
        try {
          const response = await axios.post(
            apiUrl,
            {
              records: [
                {
                  fields: {
                    name: search,
                    data: `${JSON.stringify(res.data)}`,
                  },
                },
              ],
            },
            {
              headers: {
                Authorization: authToken,
                "Content-Type": "application/json",
                Cookie:
                  "brw=brwKZl8aJarB2k2SF; brwConsent=opt-out; AWSALB=UspS+xJvYfq08bB2gTJ28BfqpBJhyMrSmoZOuhBBz0EyEr96a7BtP5VB6+9s1qMVPWndfFZ+J/PzyKOOGesKB7cN505kJBE0WThshWw71EJU0FNmRg9zD8KcEOmd; AWSALBCORS=UspS+xJvYfq08bB2gTJ28BfqpBJhyMrSmoZOuhBBz0EyEr96a7BtP5VB6+9s1qMVPWndfFZ+J/PzyKOOGesKB7cN505kJBE0WThshWw71EJU0FNmRg9zD8KcEOmd",
              },
            }
          );
          setLoading(false);
          navigate(`/search-results/${search}`);
          //second hit end
        } catch (error) {
          setLoading(false);
          console.error("Error fetching data:", error);
        }
        //first hit end
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="p-2">
      <h2>Dictionary</h2>
      <p>Find meanings and save for quick reference</p>
      <div>
        <Search value={search} setValue={setSearch} />
      </div>
      {loading ? (
        <button className="btn btn-primary mt-2">Loading...</button>
      ) : (
        <button className="btn btn-primary mt-2" onClick={handleRedirect}>
          Search
        </button>
      )}
     
      <div className="mt-2">
        <button
          className="btn btn-success"
          onClick={() => navigate("/bookmarks")}
        >
          Bookmark List
        </button>
      </div>
      <div className="mt-2">
        <button
          className="btn btn-dark"
          onClick={() => navigate("/search-history")}
        >
          Search History
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
