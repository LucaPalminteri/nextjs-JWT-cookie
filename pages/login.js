import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { supabase } from '../utils/supabaseClient'
import Link from "next/link";
import { compare } from "../helpers/handleBcrypt"

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
    console.log(validateInput());

    if(isOk == false) return

    const res = await axios.post("/api/auth/login", {email:email.current.value, isValidationOk: false});

    if (res.status === 200) {
      router.push("/");
    }
  };

  const validateInput = () => {
    users.some(user => {
      if(user.email == email.current.value && compare(password.current.value,user.password)) {
        return true;
      }
    })
    
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
      <button onClick={() => validateInput()}></button>
    </div>
  );
}

export default Home;