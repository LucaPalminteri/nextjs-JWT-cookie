import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from '../utils/supabaseClient'

function Home() {
  const router = useRouter();
  
  const [credentials, setCredentials] = useState({email: "",password: ""});
  const [isLogged, setIsLogged] = useState(false)
  const [isOk, setIsOk] = useState(true)
  const [users, setUsers] = useState([])
  const errorValidation = {outline: '2px solid red', backgroundColor: '#FFCCCC' }

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

    const res = await axios.post("/api/auth/login", credentials);

    if (res.status === 200) {
      router.push("/dashboard");
    }
  };

  const validateInput = () => {
    console.log(credentials);
    const output = users.some(user => {
      if(user.email == credentials.email && user.password == credentials.password) {
        console.log('ok');
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
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setCredentials({
              ...credentials,
              email: e.target.value,
            })
          }
          style={isOk? {} : errorValidation}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setCredentials({
              ...credentials,
              password: e.target.value,
            })
          }
          style={isOk? {} : errorValidation}
        />
        <button onClick={(e) => handleSubmit(e)}>Log in</button>
      </form>
        <button onClick={validateInput}>Cheeck isOk</button>
    </div>
  );
}

export default Home;