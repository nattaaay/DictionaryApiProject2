import React, { useState } from "react";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    const apiUrl = `https://api.airtable.com/v0/${process.env.URL_ID_TWO}/Table%201`;
    const authToken = `Bearer ${process.env.API_KEY}`;

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
                // Cookie:
                //   "brw=brwKZl8aJarB2k2SF; brwConsent=opt-out; AWSALB=UspS+xJvYfq08bB2gTJ28BfqpBJhyMrSmoZOuhBBz0EyEr96a7BtP5VB6+9s1qMVPWndfFZ+J/PzyKOOGesKB7cN505kJBE0WThshWw71EJU0FNmRg9zD8KcEOmd; AWSALBCORS=UspS+xJvYfq08bB2gTJ28BfqpBJhyMrSmoZOuhBBz0EyEr96a7BtP5VB6+9s1qMVPWndfFZ+J/PzyKOOGesKB7cN505kJBE0WThshWw71EJU0FNmRg9zD8KcEOmd",
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
    <div className="background">
      <br />
      <div className="centered row">
        <p className="col-sm-12 mt-3" id="dictionary">
          Dictionary
        </p>

        <p className="centered" id="find">
          Find meanings and save for quick reference
        </p>

        <p id="inputBox">
          <Search value={search} setValue={setSearch} />
        </p>
      </div>
      {/* */} {/* */} {/* */}
      {/* */} {/* */} {/* */}
      {/* */} {/* */} {/* */}
      {/* */} {/* */} {/* */}
      {/* */} {/* */} {/* */}
      {/* */} {/* */} {/* */}
      <div className="row">
        {loading ? (
          <button className="col-md-4 offset-4 btn btn-outline-primary mt-4">
            I'm on it...
          </button> //
        ) : (
          <button
            className="col-md-4 offset-4 btn btn-outline-primary mt-4"
            onClick={handleRedirect}
          >
            {/* <button type="button" class="btn btn-outline-primary">
              Primary
            </button> */}
            Search
          </button>
        )}
      </div>
      <br />
      <br />
      <br />
      {/* */} {/* */} {/* */}
      {/* */} {/* */} {/* */}
      {/* */} {/* */} {/* */}
      {/* */} {/* */} {/* */}
      {/* */} {/* */} {/* */}
      {/* */} {/* */} {/* */}
      <div className="row">
        {loading ? (
          <button className="col-md-3 offset-2 btn btn-outline-success mt-4">
            Hold on...
          </button> //
        ) : (
          <button
            className="col-md-3 offset-2 btn btn-outline-success mt-4"
            onClick={() => navigate("/bookmarks")}
          >
            Bookmark List
          </button>
        )}
        {/* */} {/* */} {/* */}
        {/* */} {/* */} {/* */}
        {/* */} {/* */} {/* */}
        {/* */} {/* */} {/* */}
        {/* */} {/* */} {/* */}
        {/* */} {/* */} {/* */}
        {/* <div className="row"> */}
        {loading ? (
          <button className="col-md-3 offset-2 btn btn-outline-dark mt-4">
            Just a sec...
          </button>
        ) : (
          <button
            className="col-md-3 offset-2 btn btn-outline-dark mt-4"
            onClick={() => navigate("/search-history")}
          >
            Search History
          </button>
        )}
      </div>
      {/* */} {/* */} {/* */}
      {/* */} {/* */} {/* */}
      {/* */} {/* */} {/* */}
      {/* */} {/* */} {/* */}
      {/* */} {/* */} {/* */}
      {/* */} {/* */} {/* */}
    </div>
  );
};

export default SearchPage;
