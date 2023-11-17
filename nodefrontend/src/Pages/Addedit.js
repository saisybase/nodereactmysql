import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const initialstate = {
  name: "",
  email: "",
  contact: "",
};

const Addedit = () => {
  const [state, setstate] = useState(initialstate);

  const { name, email, contact } = state;

  const hist = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setstate({ ...resp.data[0] }));
  }, [id]);

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("name is" + name + "email is " + email + "contact " + contact);
    if (!name || !email || !contact) {
      toast.error("Pleaes provide values into each field");
    } else {
      if (!id) {
        axios
          .post(
            "http://localhost:5000/api/post",
            {
              name,
              email,
              contact,
            }
            // { write or don't write not an issue
            //   headers: { "Content-Type": "application/json" },
            // }
          )
          .then(() => {
            setstate({ name: "", email: "", contact: "" });
          })
          .catch((err) => {
            toast.error(err.response.data);
          });
        toast.success("Contact added successfully");
      } else {
        axios
          .put(
            `http://localhost:5000/api/put/${id}`,
            {
              name,
              email,
              contact,
            }
            // { write or don't write not an issue
            //   headers: { "Content-Type": "application/json" },
            // }
          )
          .then(() => {
            setstate({ name: "", email: "", contact: "" });
          })
          .catch((err) => {
            toast.error(err.response.data);
          });
        toast.success("Contact updated successfully");
      }

      setTimeout(() => hist("/"), 500);
    }
  };

  const onChangehandler = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
    console.log(
      "onchangehandler values are " +
        state.name +
        "email is " +
        state.email +
        "contact is" +
        state.contact
    );
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handlesubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your Name"
          defaultValue={name}
          onChange={onChangehandler}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          defaultValue={email}
          onChange={onChangehandler}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter your contact"
          defaultValue={contact}
          onChange={onChangehandler}
        />
        <input type="submit" value={id ? "update" : "save"} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default Addedit;
