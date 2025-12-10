import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleAuth() {
    setLoading(true);
    setErrorMsg("");

    try {
      if (isLogin) {
        // LOGIN
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: pw,
        });

        if (error) throw error;

        navigate("/");
      } else {
        // SIGNUP
        const { error } = await supabase.auth.signUp({
          email,
          password: pw,
        });

        if (error) throw error;

        alert("Signup successful — check your email to confirm!");

        navigate("/");
      }
    } catch (err) {
      setErrorMsg(err.message);
    }

    setLoading(false);
  }

  return (
    <div style={container}>
      <div style={box}>
        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        {errorMsg && <p style={errorStyle}>{errorMsg}</p>}

        <input
          style={input}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPw(e.target.value)}
        />

        <button style={button} onClick={handleAuth} disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
        </button>

        <p style={{ marginTop: 20 }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <span
            style={link}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

/* --- Simple inline styling for easy use --- */

const container = {
  display: "flex",
  justifyContent: "center",
  marginTop: 60,
};

const box = {
  width: 350,
  padding: 50,
  border: "1px solid #ddd",
  borderRadius: 10,
};

const input = {
  width: "100%",
  padding: 12,
  marginTop: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 15,
};

const button = {
  width: "100%",
  padding: 12,
  marginTop: 20,
  background: "black",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 16,
};

const link = {
  color: "blue",
  cursor: "pointer",
  marginLeft: 5,
};

const errorStyle = {
  color: "red",
  marginTop: 10,
};
