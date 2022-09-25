import Link from "next/link"

function Indexpage() {
  return (
    <div>
      <h1>Index Page</h1>
      <Link href='/login'>
        <button>Login</button>
      </Link>
      <Link href='/dashboard'>
        <button>Dashboard</button>
      </Link>
    </div>
  )
}

export default Indexpage