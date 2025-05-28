import React, { useState } from "react";
const HomePage = () => {
  // const [Postes , setPostes ] = useState([]);
  const [Postes, setPostes] = useState([]);

  return (
    <>
      <h1>Home Page</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PosteFeed postes={Postes} />
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
