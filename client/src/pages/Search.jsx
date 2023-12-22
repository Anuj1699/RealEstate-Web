import axios from "axios";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ListingItem from "./ListingItem";

export default function Search() {
  const [listingData, setListingData] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, checked, value } = e.target;

    let updatedState = { ...sideBarData };

    if (id === "all" || id === "sale" || id === "rent") {
      updatedState = { ...updatedState, type: id };
    }

    if (id === "parking" || id === "furnished" || id === "offer") {
      updatedState = {
        ...updatedState,
        [id]: checked || checked === "true" ? true : false,
      };
    }

    if (id === "sort_order") {
      const sort = value.split("_")[0] || "created_at";
      const order = value.split("_")[1] || "desc";
      updatedState = { ...updatedState, sort, order };
    }

    setSideBarData(updatedState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("type", sideBarData.type);
    urlParams.set("parking", sideBarData.parking);
    urlParams.set("furnished", sideBarData.furnished);
    urlParams.set("order", sideBarData.order);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("offer", sideBarData.offer);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSideBarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }
    const getData = async () => {
      const searchQuery = urlParams.toString();
      try {
        setShowMore(false);
        setLoading(true);
        const res = await axios.get(`/api/listing/get?${searchQuery}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if(res.data.length > 8){
          setShowMore(true);
        }
        else{
          setShowMore(false);
        }
        setLoading(false);
        setListingData(res.data);
      } catch (error) {
        setLoading(false);
      }
    };
    getData();
  }, [location.search]);

  const showMoreClick = async() => {
    const numberOfListings = listingData.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await axios.get(`/api/listing/get?${searchQuery}`)
    if(res.data.length < 9){
      setShowMore(false);
    }
    const rest = res.data;
    setListingData([...listingData, ...rest]);
  }

  return (
    <div className="flex flex-col h-screen gap-5 md:flex-row">
      <form
        className="flex flex-col gap-10 px-5 pt-10 border bg-zinc-200"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center gap-3 justify-between">
          <h1 className="font-bold text-3xl tracking-wider">Filters</h1>
          <FaFilter size={30} />
        </div>
        <div className="flex flex-col gap-3 font-medium">
          <p className=" font-bold text-md">Type - :</p>
          <div className="flex gap-2 items-center text-base">
            <input
              className="w-4"
              type="checkbox"
              onChange={handleChange}
              checked={sideBarData.type === "all"}
              id="all"
            />
            <p>Rent & Sale</p>
            <input
              className="w-4"
              type="checkbox"
              onChange={handleChange}
              checked={sideBarData.type === "sale"}
              id="sale"
            />
            <p>Sale</p>
            <input
              className="w-4"
              type="checkbox"
              onChange={handleChange}
              checked={sideBarData.type === "rent"}
              id="rent"
            />
            <p>Rent</p>
            <input
              className="w-4"
              type="checkbox"
              onChange={handleChange}
              checked={sideBarData.offer}
              id="offer"
            />
            <p>Offer</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 font-medium">
          <p className=" font-bold text-md">Amenities - :</p>
          <div className="flex gap-2 items-center text-base">
            <input
              className="w-4"
              type="checkbox"
              onChange={handleChange}
              checked={sideBarData.parking}
              id="parking"
            />
            <p>Parking</p>
            <input
              className="w-4"
              type="checkbox"
              onChange={handleChange}
              checked={sideBarData.furnished}
              id="furnished"
            />
            <p>Furniture</p>
          </div>
        </div>
        <div className="flex gap-3 items-center font-medium">
          <p>Sort :</p>
          <select
            name="sort"
            className="p-3 rounded-lg cursor-pointer text-base"
            defaultValue={"created_at_desc"}
            id="sort_order"
            onChange={handleChange}
          >
            <option value="createdAt_desc">Latest</option>
            <option value="createdAt_asc">Older</option>
            <option value="regularPrice_desc">Price high to Low</option>
            <option value="regularPrice_asc">Price Low to High</option>
          </select>
        </div>
        <button className="uppercase rounded-full bg-slate-700 text-white p-3 hover:opacity-80">
          Filter
        </button>
      </form>
      <div className="pt-10 w-full overflow-y-scroll">
        <h1 className="font-bold text-3xl tracking-wider">Listing Results :</h1>
        {loading ? (
        <div className="flex justify-center items-center mt-60">
          <svg
            className="animate-spin h-10 w-10 border-t-4 border-b-4 border-gray-500 rounded-full"
            viewBox="0 0 24 24"
          ></svg>
        </div>
        ) : listingData.length === 0 ? (
          <h1 className="flex justify-center items-center mt-60 font-semibold text-4xl">No Listing Found</h1>
        ) : (
            <ListingItem listingData = {listingData}/>
        )}
        {showMore && (
          <button onClick={showMoreClick} className=" text-green-700 hover:underline p-7 text-center w-full">Show More</button>
        )}
      </div>
    </div>
  );
}
