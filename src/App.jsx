import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

import Home from "./pages/Home";
import Auth from "./pages/auth";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";

export default function App() {
  const [user, setUser] = useState(null);

  // Load user on start
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Listen for changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <BrowserRouter>
      <nav style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
        
        <Link to="/" style={{ marginRight: 15 }}>
          Home
        </Link>

        {user && (
          <Link to="/new" style={{ marginRight: 15 }}>
            Write
          </Link>
        )}

       
        <span style={{ float: "right" }}>
          {user ? (
            <>
              <span style={{ marginRight: 10 }}>
                Logged in as <b>{user.email}</b>
              </span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/auth">Login</Link>
          )}
        </span>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/new" element={<NewPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}
