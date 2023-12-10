import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

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
    <main>
      {loading && (
        <h1 className="text-center my-52 font-bold text-4xl">Loading...</h1>
      )}
      {error && (
        <p className="text-center my-52 font-bold text-4xl">
          Something Went Wrong
        </p>
      )}
      <Carousel className="flex flex-col mx-auto max-w-6xl mt-5">
        {listing && listing.imageUrls && listing.imageUrls.length === 0 ? (
          <h1 className="text-center my-52 font-bold text-4xl">No Images</h1>
        ) : (
          listing &&
            listing.imageUrls &&
            listing.imageUrls.map((item) => (
              <div key={item} className="w-full h-[550px]">
                <img src={item} className="rounded-lg object-contain w-full h-full" alt="house-images"/>
              </div>
            ))
        )}
      </Carousel>
    </main>
  );
};

export default Listing;
