import { useSelector } from "react-redux"

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
         <img src={currentUser.avatar} className="rounded-full h-24 w-24 object-contain cursor-pointer my-2 self-center" alt="profile-pic" />
         <input type="username" placeholder="username" name="username" className="border rounded-lg p-3"/>
         <input type="email" placeholder="email" name="email" className="border rounded-lg p-3"/>
         <input type="password" placeholder="password" name="password" className="border rounded-lg p-3"/>
         <button className=" uppercase bg-slate-700 rounded-lg p-3 text-white hover:opacity-90 disabled:opacity-70">update</button>
      </form>
      <div className="flex justify-between mt-3 text-red-600 cursor-pointer">
        <span>Delete Account</span>
        <span>SignOut</span>
      </div>
    </div>

  )
}
