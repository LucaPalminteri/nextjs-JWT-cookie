import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

function Home() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [isOk, setIsOk] = useState(true)

  const router = useRouter();

  const errorValidation = {outline: '2px solid red', backgroundColor: '#FFCCCC' }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/login", credentials);
    console.log(res);

    if (res.status === 200) {
      router.push("/dashboard");
    }
  };

  const validateInput = () => {
    
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
        <button>Log in</button>
      </form>
        <button onClick={() => setIsOk(prev => !prev)}>Cheeck isOk</button>
    </div>
  );
}

export default Home;