import axios from "axios";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaBed, FaBath } from "react-icons/fa";

export default function Search() {
  const [listingData, setListingData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/listing/get", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setListingData(res.data);
      } catch (error) {}
    };
    getData();
  }, []);
  return (
    <div className="flex flex-col h-screen gap-5 md:flex-row">
      <div className="lg:flex flex-col gap-10 px-5 pt-10 border bg-zinc-200">
        <div className="flex items-center gap-3 justify-between">
          <h1 className="font-bold text-4xl">Filters</h1>
          <FaFilter size={30} />
        </div>
        <div className="flex flex-col gap-3 font-medium text-lg">
          <p className=" font-bold text-xl">Type - :</p> 
          <div className="flex gap-2 items-center">
            <input className="w-4" type="checkbox" />
            <p>Rent & Sale</p>
            <input className="w-4" type="checkbox" />
            <p>Sale</p>
            <input className="w-4" type="checkbox" />
            <p>Rent</p>
            <input className="w-4" type="checkbox" />
            <p>Offer</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 font-medium text-lg">
          <p className=" font-bold text-xl">Amenities - :</p> 
          <div className="flex gap-2 items-center">
            <input className="w-4" type="checkbox" />
            <p>Parking</p>
            <input className="w-4" type="checkbox" />
            <p>Furniture</p>
          </div>
        </div>
        <div className="flex gap-3 items-center font-medium text-lg">
          <p>Sort :</p>
          <select name="sort" className="p-3 rounded-lg cursor-pointer">
            <option value="latest">Latest</option>
            <option value="latest">Older</option>
            <option value="latest">Price high to Low</option>
            <option value="latest">Price Low to High</option>
          </select>
        </div>
      </div>
      <div className="pt-10 w-full md:w-auto overflow-y-scroll">
        <h1 className="font-bold text-3xl">Listing Results :</h1>
        <div className="flex gap-3 mt-10 flex-wrap ">
          {listingData &&
            listingData.map((item) => {
              return (
                <div
                  key={item._id}
                  className="max-h-screen border shadow-lg rounded-lg w-full sm:w-[300px] md:w-[350px]"
                >
                  <div>
                    <img
                      className="w-full object-cover h-60 rounded-lg cursor-pointer"
                      src={item.imageUrls}
                      alt="listing-image"
                    />
                  </div>
                  <div className="p-3 flex flex-col justify-center gap-3">
                    <h1 className="font-bold text-lg">{item.name}</h1>
                    <p className="flex items-center gap-2 text-sm">
                      <FaLocationDot size={10} /> {item.address}
                    </p>
                    <p className="text-md">
                      {item.description.slice(0, 35)}...
                    </p>
                    <p className="font-bold text-lg tracking-wide">
                      {item.offer
                        ? item.type === "sale"
                          ? `₹ ${item.discountedPrice}`
                          : `${item.discountedPrice} ₹ / month`
                        : item.type === "sale"
                        ? `₹ ${item.discountedPrice}`
                        : `${item.discountedPrice} ₹ / month`}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <p className="flex items-center gap-2">
                        {item.bedrooms} <FaBed />{" "}
                      </p>
                      <p className="flex items-center gap-2">
                        {item.bathrooms} <FaBath />{" "}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
