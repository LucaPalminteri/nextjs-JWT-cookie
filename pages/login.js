import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { supabase } from '../utils/supabaseClient'
import Link from "next/link";

function Home() {
  const router = useRouter();
  
  const [isOk, setIsOk] = useState(true)
  const [users, setUsers] = useState([])
  const errorValidation = {outline: '2px solid red', backgroundColor: '#FFCCCC' }

  const email = useRef();
  const password = useRef();

  const primaryBtn = {backgroundColor: '#24a0ed', color: '#FFF'}

  useEffect(()=> {
    fetchUsers()
  })

  const fetchUsers = async () => {
    const { data } = await supabase.from('profiles').select();
    setUsers(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(validateInput == false) return

    const res = await axios.post("/api/auth/login", {email:email.current.value,password:password.current.value});

    if (res.status === 200) {
      router.push("/");
    }
  };

  const validateInput = () => {
    const output = users.some(user => {
      if(user.email == email.current.value && user.password == password.current.value) {
        return true;
      }
      else console.log('not ok');
    })
    if(output == true) setIsOk(true)
    else if(output == false) setIsOk(false)
    return output
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <input
          type="email"
          placeholder="Email"
          ref={email}
          style={isOk? {} : errorValidation}
        />
        <input
          type="password"
          placeholder="Password"
          ref={password}
          style={isOk? {} : errorValidation}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)} style={primaryBtn}>Log in</button>
        <Link href='singup'>
          <button>Sign Up</button>
        </Link>
      </form>
    </div>
  );
}

export default Home;