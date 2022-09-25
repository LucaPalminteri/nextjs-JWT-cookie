import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { supabase } from '../../../utils/supabaseClient'

export default function loginHandler(req, res) {
  const { email, password } = req.body;
  const isOk = false

  (async () => {
    const { data } = await supabase.from('profiles').select();
    console.log(data);
    data.some(user => {
      if(user.email == email && user.password == password) {
        isOk = true
        return true;
      }
      else isOk =false
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
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({
      message: "Login successful",
    });
  }

  return res.status(401).json({ error: "Invalid credentials" });
}
