import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Addedit from "./Addedit";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setdata] = useState([]);

  const loaddata = async () => {
    const getdata = await axios.get("http://localhost:5000/api/get");
    setdata(getdata.data);
  };

  const deleteitem = (id) => {
    if (window.confirm("Do you want to delete ?")) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Contact deleted successfully");
      setTimeout(() => loaddata(), 500);
    }
  };

  useEffect(() => {
    loaddata();
  }, []);

  return (
    <div style={{ marginTop: "150px" }}>
      <Link to="/addcontact">
        <button className="btn btn-contact">Add Contact</button>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Id</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => {
                      deleteitem(item.id);
                    }}
                  >
                    delete
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">view</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
