import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaBed, FaBath } from "react-icons/fa";

export default function ListingItem({listingData}) {
  return (
    <div className="flex gap-3 mt-10 flex-wrap">
      {listingData &&
        listingData.map((item) => {
          return (
            <div
              key={item._id}
              className="max-h-screen border shadow-lg rounded-lg w-full sm:w-[300px] md:w-[350px]"
            >
              <div className="overflow-hidden">
                <Link to={`/listing/${item._id}`}>
                  <img
                    className="w-full object-cover h-60 rounded-lg cursor-pointer transition-transform duration-300 transform hover:scale-110"
                    src={item.imageUrls}
                    alt="listing-image"
                  />
                </Link>
              </div>
              <div className="p-3 flex flex-col justify-center gap-3">
                <h1 className="font-bold text-lg">{item.name}</h1>
                <p className="flex items-center gap-2 text-sm">
                  <FaLocationDot size={10} /> {item.address.slice(0, 30)}
                </p>
                <p className="text-md">{item.description.slice(0, 30)}...</p>
                <p className="font-bold text-lg tracking-wide">
                  {item.offer
                    ? item.type === "sale"
                      ? `₹ ${item.discountedPrice.toLocaleString('en-IN')}`
                      : `${item.discountedPrice.toLocaleString('en-IN')} ₹ / month`
                    : item.type === "rent"
                    ? `${item.regularPrice.toLocaleString('en-IN')} ₹ / month`
                    : `₹ ${item.regularPrice.toLocaleString('en-IN')}`}
                </p>
                <div className="flex items-center text-sm justify-between">
                  <div className="flex items-center gap-2">
                    <p className="flex items-center gap-2">
                      {item.bedrooms} <FaBed />{" "}
                    </p>
                    <p className="flex items-center gap-2">
                      {item.bathrooms} <FaBath />{" "}
                    </p>
                  </div>
                  <span
                    className={`font-bold ${
                      item.type === "sale" ? "bg-green-700" : "bg-red-700"
                    } px-5 rounded-lg uppercase text-white`}
                  >{`For ${item.type}`}</span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
