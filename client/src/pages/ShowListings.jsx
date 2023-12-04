import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowListings = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userListing, setUserListing] = useState([]);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false);
  const showListings = async () => {
    try {
      const res = await axios.get(`/api/user/listings/${currentUser._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.length === 0) {
        setEmpty(true);
      } else {
        setEmpty(false);
        setUserListing(res.data);
      }
    } catch (error) {
      if (error.response.data.success === false) {
        setError(error.response.data.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/listing/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      showListings();
    } catch (error) {

    }
  };

  useEffect(() => {
    showListings();
  }, []);
  return (
    <div>
      <h1 className=" font-bold text-center text-3xl py-8">Your Listings</h1>
      <div className="mx-auto p-5 flex gap-8 justify-center items-center flex-1 flex-wrap max-w-screen-2xl">
        {empty ? (
          <h1 className="uppercase font-bold text-gray-600 text-4xl my-20">
            No listing Found !!!
          </h1>
        ) : (
          userListing.map((data) => (
            <div
              className="border rounded-lg shadow-lg w-80 h-80 p-3 flex flex-col justify-between"
              key={data._id}
            >
              <Link to={`/listing/${data._id}`}>
                <img
                  className="object-cover w-full h-40 border rounded-lg mb-1 cursor-pointer"
                  src={data.imageUrls[0]}
                  alt="House-Image"
                />
              </Link>
              <div>
                <h1 className="font-semibold text-lg">
                  {data.name.slice(0, 30)}
                </h1>
              </div>
              <p className="my-1">{`${data.description.slice(0, 100)}...`}</p>
              <div className="flex justify-between">
                <button
                  className="text-red-700 uppercase"
                  onClick={() => handleDelete(data._id)}
                >
                  Delete
                </button>
                <button className="text-green-700 uppercase">Edit</button>
              </div>
            </div>
          ))
        )}
        {error && <p className=" text-red-700">{error}</p>}
      </div>
    </div>
  );
};

export default ShowListings;
