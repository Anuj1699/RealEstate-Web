import { useState } from "react";
import {getDownloadURL, getStorage, uploadBytesResumable, ref} from "firebase/storage"
import {app} from "../firebase"

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls : []
  });
  const[uploading,setUploading] = useState(false);
  const handleImageUpload = () => {
    if(files.length > 0 && files.length + formData.imageUrls.length < 7){
       setUploading(true);
       const promises = [];
       for(let i = 0; i < files.length; i++){
        promises.push(storeImage(files[i]));
       }

       Promise.all(promises).then((urls) => {
        setFormData({...formData, imageUrls : formData.imageUrls.concat(urls)});
        setImageUploadError(false);
        setUploading(false);
       }).catch((err) =>{
        setImageUploadError('Image Upload failed (2 mb max per image)')
        setUploading(false);
       })
    }
    else{
      setImageUploadError("You can only upload 6 image max per listing");
      setUploading(false);
    }
  };
  const storeImage = async (file) =>{
    return new Promise((resolve,reject) =>{
      const storage = getStorage(app);
      const fileName =new Date().getTime() + file.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on(
        'state_changed',
        (snapshot) =>{
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) =>{
          reject(error)
        },
        () =>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>{
            resolve(downloadUrl);
          })
        }
      )
    })
  }
  const handleRemoveImage = (index) =>{
    setFormData({
      ...formData,
      imageUrls:formData.imageUrls.filter((_ , i) => i !== index),
    })
  }
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
            <p>
              Images: <span>The first image will be the cover (max 6)</span>
            </p>
            <div className="flex flex-col lg:flex-row gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFiles(e.target.files)}
                className="p-3 border border-gray-400 rounded w-full"
                multiple
              />
              <button
                type="button"
                disabled={uploading}
                onClick={handleImageUpload}
                className=" uppercase text-green-700 border border-green-700 rounded p-3 hover:shadow-lg disabled:opacity-60"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            <p className=" text-red-700">{imageUploadError && imageUploadError}</p>
            {
              formData.imageUrls.length > 0 && formData.imageUrls.map((url,index) => 
              (
                <div className="flex justify-between items-center border" key={url}>
                   <img src={url} alt = "listing_image" className="w-20 h-20 object-contain rounded-lg"/>
                   <button className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75" onClick={() => handleRemoveImage(index)}>Delete</button>
                </div>
              ))
            }
            <button className="uppercase p-3 bg-slate-700 rounded-lg text-white hover:opacity-95 disabled:opacity-95">
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
