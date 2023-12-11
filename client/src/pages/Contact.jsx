import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/user/${listing.userRef}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setLandlord(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <div className="font-medium">
            <p>
              Contact{" "}
              <span className="font-bold">{landlord.username + " "}</span>
              for <span className="font-bold">{listing.name}</span>
            </p>
          </div>
          <textarea
            name="message"
            placeholder="Enter Your Message Here...."
            onChange={handleChange}
            value={message}
            rows="2"
            className="mt-2 rounded-lg w-full p-3"
          ></textarea>
          <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className="text-white p-3 bg-slate-700 rounded-lg my-5 text-center w-full mx-auto lg:w-4/5 hover:opacity-90">
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};
