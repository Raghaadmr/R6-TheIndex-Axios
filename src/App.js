import React, { useState ,useEffect } from "react";
import axios from "axios";
// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";

const App = () => {
  const [currentAuthor, setCurrentAuthor] = useState(null);

  const [authors, setAuthors] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Rendering");
    fetchAuthors();
  }, []);

  const selectAuthor = async (authorID) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${authorID.id}/`
      );
      setCurrentAuthor(response.data);
      setLoading(false);
    } catch (error) {
      console.log("error");  
      }
  };

  const unselectAuthor = () => setCurrentAuthor(null);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
        );
      setAuthors(response.data);
      setLoading(false);
    } catch (e) {
      console.log("error");
    }
  };
  const getContentView = () => {
    if (currentAuthor) {
      return <AuthorDetail author={currentAuthor} />;
    }  else {
      if (loading) {return <h2 > LOADING ...</h2>;
    }
   else {
     return <AuthorList authors={authors} selectAuthor={selectAuthor} />;}
    }
  };

  return (
    <div id="app" className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar unselectAuthor={unselectAuthor} />
        </div>
        <div className="content col-10">{getContentView()}</div>
      </div>
    </div>
  );
};

export default App;
