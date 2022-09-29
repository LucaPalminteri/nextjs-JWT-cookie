import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { supabase } from '../../../utils/supabaseClient'
import { compare } from '../../../helpers/handleBcrypt';

export default function loginHandler(req, res) {
  const { email, password } = req.body;
  let output = false

  console.log(`req body:\nemail=${email}\npassword=${password}`);

  const getUsers = async () => {
    const { data, error } = await supabase.from('profiles').select();
    output = data.some(user => {

      // TODO: make encrypted comparassion work, rn it returns a promise (should be boolean)

      let samePass = compare(password, user.password)
      console.log(`${email} == ${user.email} ?? ${user.email == email}`);
      console.log(`${password} == ${user.password} ?? ${samePass}`);
      if(user.email == email && compare(password, user.password)) {
        return true;
      }
    })
  }
  getUsers()

  console.log(output);

  

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
