import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { GoDotFill } from "react-icons/go";
import { FaBed, FaParking } from "react-icons/fa";
import { GiBathtub } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";
import { MdChair, MdOutlineDiscount } from "react-icons/md";

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    const listingData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/listing/get/${params.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setListing(res.data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    listingData();
  }, [params.id]);
  return (
    <main className="mx-auto max-w-7xl p-1">
      <div>
        {loading && (
          <h1 className="text-center my-52 font-bold text-4xl">Loading...</h1>
        )}
        {error && (
          <p className="text-center my-52 font-bold text-4xl">
            Something Went Wrong
          </p>
        )}
        <Carousel className="flex flex-col mt-5">
          {listing && listing.imageUrls && listing.imageUrls.length === 0 ? (
            <h1 className="text-center my-52 font-bold text-4xl">No Images</h1>
          ) : (
            listing &&
            listing.imageUrls &&
            listing.imageUrls.map((item) => (
              <div key={item} className="w-full h-[550px]">
                <img
                  src={item}
                  className="rounded-lg object-contain w-full h-full"
                  alt="house-images"
                />
              </div>
            ))
          )}
        </Carousel>
      </div>
      {listing ? (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-1">
            <GoDotFill />
            <span
              className={`font-bold ${
                listing.type === "sale" ? "bg-green-700" : "bg-red-700"
              } px-5 rounded-lg uppercase text-white`}
            >{`For ${listing.type}`}</span>
          </div>
          <div className="flex gap-5 items-center mt-3">
            <h1 className="font-extrabold text-4xl">{listing.name}</h1>
            <h1 className=" font-bold text-2xl tracking-wide">{`${
              listing.type === "sale"
                ? "₹ " + listing.regularPrice
                : listing.regularPrice + " ₹ / month"
            }`}</h1>
          </div>
          <div className="flex items-center bg-red-800 max-w-sm rounded-lg text-white gap-1 p-2">
            <MdOutlineDiscount size={20} />
            <span>
              {`₹ ${listing.regularPrice - listing.discountedPrice}`}  Discount
            </span>
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            <p className="flex items-center gap-2">
              <FaBed size={20} />
              {listing.bedrooms > 1
                ? listing.bedrooms + "bedrooms"
                : listing.bedrooms + "bedroom"}
            </p>
            <p className="flex items-center gap-2">
              <GiBathtub size={20} />
              {listing.bathrooms > 1
                ? listing.bathrooms + "bathrooms"
                : listing.bathrooms + "bath"}
            </p>
            <p className="flex items-center gap-2">
              <FaParking size={20} />
              {listing.parking ? "Parking Available" : "No Parking"}
            </p>
            <p className="flex items-center gap-2">
              <MdChair size={20} />
              {listing.furnished ? "Furnished" : "Not Furnished"}
            </p>
          </div>
          <p className="flex gap-2 items-center">
            <FaLocationDot size={20} />
            {listing.address}
          </p>
          <p className="font-bold">
            Description -{" "}
            <span className="font-normal text-slate-700">
              {listing.description}
            </span>
          </p>
        </div>
      ) : (
        <h1>Loading....</h1>
      )}
    </main>
  );
};

export default Listing;
