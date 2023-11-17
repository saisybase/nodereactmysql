import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const View = () => {
  const [user, setuser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setuser({ ...resp.data[0] }));
  }, [id]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
        </div>
        <div className="container">
          <strong>ID </strong>
          <span>{id}</span>
          <br></br>
          <br></br>
          <strong>Name </strong>
          <span>{user.name}</span>
          <br></br>
          <br></br>
          <strong>Email </strong>
          <span>{user.email}</span>
          <br></br>
          <br></br>
          <strong>Contact </strong>
          <span>{user.contact}</span>
          <br></br>
          <br></br>

          <Link to="/">
            <div className="btn btn-edit">Go Back</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
