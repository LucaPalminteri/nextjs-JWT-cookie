import Link from "next/link"
import axios from "axios"
import { useEffect, useState } from "react"

function Indexpage() {

  const [isLogged, setIsLogged] = useState(false)

  useEffect(()=> {
    (async () => {
      const {data} = await axios.get("/api/profile");
      if(data.username != '') setIsLogged(true)
    } )()
  })

  return (
    <div>
      <h1>Index Page</h1>

      <Link href={setIsLogged ? '/dashboard' : '/login'}>
        <button>{setIsLogged ? 'Dashboard' : 'Login'}</button>
      </Link>
    </div>
  )
}

export default Indexpage