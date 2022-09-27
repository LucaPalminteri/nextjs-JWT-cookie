import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";


function Dashboard() {
  const [user, setUser] = useState({
    email: "",
    username: "",
  });
  const router = useRouter();
  useEffect(()=>{
    setUser(getProfile())
  },[])

  const getProfile = async () => {
    const profile = await axios.get("/api/profile");
    setUser(profile.data);
  };

  const logout = async () => {
    try {
      await axios.get("/api/auth/logout");
    } catch (error) {
      console.error(error.message);
    }
    router.push("/login");
  };
  return (
    <div className="dashboard">
      <div className="data-container">
        <span>Username</span><span>{user.username}</span>
      </div>
      <div className="data-container">
        <span>Email</span><span>{user.email}</span>
      </div>
      <button onClick={() => logout()}>Logout</button>
      <Link href='/'>
        <button>Home</button>
      </Link>
    </div>
  );
}

export default Dashboard;
