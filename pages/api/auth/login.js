import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { supabase } from '../../../utils/supabaseClient'
import { encrypt, compare } from '../../../helpers/handleBcrypt';

export default function loginHandler(req, res) {
  const { email, password } = req.body;

  (async () => {
    const { data } = await supabase.from('users').select();
    console.log(data);
    const output = data.some(user => {
      if(user.email == email && compare(password, user.password)) {
        return true;
      }
    })
  })()

  

  if (email === "admin@gmail.com" && password === "admin") {
    // expire in 30 days
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        email,
        username: "lucaPalmi",
      },
      "secret"
    );

    const serialized = serialize("myTokenName", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({
      message: "Login successful",
    });
  }

  return res.status(401).json({ error: "Invalid credentials" });
}
