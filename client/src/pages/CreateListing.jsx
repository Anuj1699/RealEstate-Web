import React from "react";

export default function CreateListing() {
  return (
    <>
      <div className="p-3 max-w-4xl mx-auto">
        <h1 className="text-center font-semibold my-7 text-3xl">
          Create Listing
        </h1>
        <form className="flex flex-col sm:flex-row flex-1 gap-6">
          <div className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Name"
              className="rounded-lg p-3 border"
              name="name"
              maxLength="62"
              minLength="10"
              required
            />
            <textarea
              type="text"
              placeholder="Description"
              className="rounded-lg p-3 border resize-y"
              name="desc"
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="rounded-lg p-3 border"
              name="address"
              required
            />
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-row gap-2">
                <input type="checkbox" name="sell" className="w-5" />
                <span>Sell</span>
              </div>
              <div className="flex flex-row gap-2">
                <input type="checkbox" name="sell" className="w-5" />
                <span>Rent</span>
              </div>
              <div className="flex flex-row gap-2">
                <input type="checkbox" name="sell" className="w-5" />
                <span>Parking Spot</span>
              </div>
              <div className="flex flex-row gap-2">
                <input type="checkbox" name="sell" className="w-5" />
                <span>Furnished</span>
              </div>
              <div className="flex flex-row gap-2">
                <input type="checkbox" name="sell" className="w-5" />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex flex-col flex-wrap gap-6">
              <div className="flex gap-5">
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    className="rounded-lg border p-3 border-gray-300"
                    name="beds"
                    min="1"
                    max="10"
                    required
                  />
                  <span>Beds</span>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    className="rounded-lg border p-3 border-gray-300"
                    name="bath"
                    min="1"
                    max="10"
                    required
                  />
                  <span>Bath</span>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    className="rounded-lg border p-3 border-gray-300"
                    name="regularprice"
                    required
                  />
                  <div className="flex flex-col">
                    <span>Regular Price</span>
                    <span className="text-sm"> (₹ / month)</span>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    className="rounded-lg border p-3 border-gray-300"
                    name="beds"
                    required
                  />
                  <div className="flex flex-col">
                    <span>Discounted Price</span>
                    <span className="text-sm"> (₹ / month)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p>Images: <span>The first image will be the cover (max 6)</span></p>
            <div className="flex flex-col lg:flex-row gap-4">
              <input type="file" accept="image/*" className="p-3 border border-gray-400 rounded w-full" multiple/>
              <button className=" uppercase text-green-700 border border-green-700 rounded p-3 hover:shadow-lg disabled:opacity-80">Upload</button>
            </div>
            <button className="uppercase p-3 bg-slate-700 rounded-lg text-white hover:opacity-95 disabled:opacity-95">Create Listing</button>
          </div>
        </form>
      </div>
    </>
  );
}
