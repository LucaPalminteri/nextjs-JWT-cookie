import { useRef } from 'react';
import { supabase } from '../utils/supabaseClient'
import { encrypt, compare } from '../helpers/handleBcrypt';

function Singup() {

  const username = useRef()
  const email = useRef()
  const password = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();
        createUser()
    
      };

      async function createUser() {
        const hashPas = await encrypt(password.current.value)
        const {data} = await supabase
          .from('')
          .select()
          console.log(data);
        //   .insert(
        //     [{
        //         username: username.current.value,
        //         email: email.current.value,
        //         password: hashPas
        //       },],
        //     { upsert: false }
        //   );
        //   email.current.value = ""; username.current.value= ""; password.current.value = ""
        //   console.log("user creates succesfully!");
        } 

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          type="password"
          placeholder="Password"
          ref={password}
        />
        <button onClick={(e) => handleSubmit(e)}>Sing up</button>
      </form>
    </div>
  )
}

export default Singup