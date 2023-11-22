import { useSelector,useDispatch } from "react-redux";
import {updateUserFailure,updateUserStart,updateUserSuccess} from "../redux/userSlice/userSlice.js";
import { useRef, useState, useEffect } from "react";
import { app } from "./../firebase";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function Profile() {
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [successUpdate, setSuccessUpdate] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };
  const handleChange = (e) =>{
    const{name,value} = e.target;
    setFormData({
      ...formData,
      [name] : value
    });
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
       dispatch(updateUserStart())
       const res = await axios.put(`/api/user/update/${currentUser._id}`,formData,{
          header : "application/json"
       });
       dispatch(updateUserSuccess(res.data))
       setSuccessUpdate(true);
    } catch (error) {
      if(error.response.data.success === false){
        dispatch(updateUserFailure(error.response.data.message));
       }
    }
  }
  const fileRef = useRef(null);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          hidden
        />
        <img
          src={formData.avatar || currentUser.avatar}
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer my-2 self-center"
          alt="profile-pic"
        />
        <p className="text-center">
          {fileUploadError ? (
            <span className=" text-red-700">Error Upload Image(image should be less than 2mb)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className=" text-green-700">
              Image Successfully Uploaded!
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          name="username"
          className="border rounded-lg p-3"
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          name="email"
          className="border rounded-lg p-3"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          className="border rounded-lg p-3"
        />
        <button disabled={loading} className=" uppercase bg-slate-700 rounded-lg p-3 text-white hover:opacity-90 disabled:opacity-70">
          {loading ? "loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-3 text-red-600 cursor-pointer">
        <span>Delete Account</span>
        <span>SignOut</span>
      </div>
      <p className="text-red-700 text-center">{error ? error : ''}</p>
      <p className=" text-green-700 text-center">{successUpdate ? "User Updated Successfully" : ''}</p>
    </div>
  );
}
