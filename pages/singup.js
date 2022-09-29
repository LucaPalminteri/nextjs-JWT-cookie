import { useRef, useState } from 'react';
import { supabase } from '../utils/supabaseClient'
import { encrypt, compare } from '../helpers/handleBcrypt';
import Link from 'next/link';

function Singup() {

  const username = useRef()
  const email = useRef()
  const password = useRef()

  const [showPassword, setShowPassword] = useState(false)

  const primaryBtn = {backgroundColor: '#24a0ed', color: '#FFF'}


    const handleSubmit = async (e) => {
        e.preventDefault();
        createUser()
    
      };

      async function createUser() {
        const hashPas = await encrypt(password.current.value)
        console.log("signup");
        const {data, error} = await supabase
          .from('profiles')
          .insert(
            [{
                username: username.current.value,
                email: email.current.value,
                password: hashPas
              },],
            { upsert: false }
          );
          email.current.value = ""; username.current.value= ""; password.current.value = "";
        } 

  return (
    <div className='signup'>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          ref={username}
        />
        <input
          type="email"
          placeholder="Email"
          ref={email}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          ref={password}
        />
        <button type='submit' onClick={(e) => handleSubmit(e)} style={primaryBtn}>Sign up</button>
        <Link href='login'>
          <button>Login</button>
        </Link>
      </form>
      <button onClick={() => setShowPassword(prev => !prev)}>View password</button>
    </div>
  )
}

export default Singup