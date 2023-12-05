import { useState,useEffect } from "react";
import {getDownloadURL, getStorage, uploadBytesResumable, ref} from "firebase/storage"
import {app} from "../firebase"
import axios from "axios"
import { useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';

export default function EditListing() {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls : [],
    name : "",
    description : "",
    address : "",
    type : "sell",
    bedrooms : 1,
    bathrooms : 1,
    regularPrice : 2500,
    discountedPrice : 0,
    offer : false,
    parking : false,
    furnished : false
  });
  const[uploading,setUploading] = useState(false);
  const {currentUser} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
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
          setImageUploadError(false);
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
  const handleChange = (e) =>{
    const {name,checked,type,value} = e.target;
    if(name === "sell" || name === "rent"){
      setFormData({
        ...formData,
        type : name
      })
    }

    if(name === "parking" || name === "furnished" || name === "offer"){
      setFormData({
        ...formData,
        [name] : checked
      })
    }

    if(type === "text" || type === "textarea" || type === "number"){
      setFormData({
        ...formData,
        [name] : value
      })
    }
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
      if(formData.regularPrice < formData.discountedPrice) return setError("discounted price must be lower than regular price");
      if(formData.imageUrls.length === 0){
        return setError("Add atleast one image")
      }
      setLoading(true);
      setError(null);
      const res = await axios.put(`/api/listing/update/${params.id}`, {...formData,userRef : currentUser._id},{
        headers : {
          "Content-Type": "application/json",
        }
      })
      setLoading(false);
      setError(null);
      navigate(`/listing/${res.data._id}`);
    } catch (error) {
      if(error.response.data.success === "false"){
        setLoading(false);
        setError(error.response.data.message);
      }
      setLoading(false);
    }
  }
  useEffect(() => {
    const listing = async() => {
      const res = await axios.get(`/api/listing/get/${params.id}`,{
        headers : {
          "Content-Type" : "application/json"
        }
      });
      setFormData(res.data)
    }
    listing();
  },[])
  return (
    <>
      <div className="p-3 max-w-4xl mx-auto">
        <h1 className="text-center font-semibold my-7 text-3xl">
          Update Listing
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row flex-1 gap-6">
          <div className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Title"
              className="rounded-lg p-3 border"
              name="name"
              onChange={handleChange}
              value={formData.name}
              maxLength="62"
              minLength="10"
              required
            />
            <textarea
              type="text"
              placeholder="Description"
              className="rounded-lg p-3 border resize-y"
              name="description"
              onChange={handleChange}
              value={formData.description}
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="rounded-lg p-3 border"
              name="address"
              onChange={handleChange}
              value={formData.address}
              required
            />
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-row gap-2">
                <input type="checkbox" name="sell" className="w-5" onChange={handleChange}
              checked={formData.type === "sell"}/>
                <span>Sell</span>
              </div>
              <div className="flex flex-row gap-2">
                <input type="checkbox" name="rent" className="w-5" onChange={handleChange}
              checked={formData.type === "rent"}/>
                <span>Rent</span>
              </div>
              <div className="flex flex-row gap-2">
                <input type="checkbox" name="parking" className="w-5" onChange={handleChange}
              checked={formData.parking}/>
                <span>Parking Spot</span>
              </div>
              <div className="flex flex-row gap-2">
                <input type="checkbox" name="furnished" className="w-5" onChange={handleChange}
              checked={formData.furnished}/>
                <span>Furnished</span>
              </div>
              <div className="flex flex-row gap-2">
                <input type="checkbox" name="offer" className="w-5" onChange={handleChange}
              checked={formData.offer}/>
                <span>Offer</span>
              </div>
            </div>
            <div className="flex flex-col flex-wrap gap-6">
              <div className="flex gap-5">
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    className="rounded-lg border p-3 border-gray-300"
                    name="bedrooms"
                    min="1"
                    max="10"
                    onChange={handleChange}
                    value={formData.bedrooms}
                    required
                  />
                  <span>Beds</span>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    className="rounded-lg border p-3 border-gray-300"
                    name="bathrooms"
                    min="1"
                    max="10"
                    onChange={handleChange}
                    value={formData.bathrooms}
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
                    name="regularPrice"
                    min="2500"
                    max="10000000"
                    onChange={handleChange}
                    value={formData.regularPrice}
                    required
                  />
                  <div className="flex flex-col">
                    <span>Regular Price</span>
                    <span className="text-sm">{formData.type === "sell" ? " " : "₹ / month"}</span>
                  </div>
                </div>
                {formData.offer && (
                  <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    className="rounded-lg border p-3 border-gray-300"
                    name="discountedPrice"
                    onChange={handleChange}
                    value={formData.discountedPrice}
                    required
                  />
                  <div className="flex flex-col">
                    <span>Discounted Price</span>
                    <span className="text-sm">{formData.type === "sell" ? " " : "₹ / month"}</span>
                  </div>
                </div>
                )}
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
            <button disabled={loading || uploading} className="uppercase p-3 bg-slate-700 rounded-lg text-white hover:opacity-95 disabled:opacity-80">
               {loading ? "updating..." : "update Listing"}
            </button>
            {error && <p className="text-red-700 text-sm">{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
}

