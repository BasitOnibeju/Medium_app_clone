import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    setPosts(data || []);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Latest Posts</h1>

      {posts.map((p) => (
        <div key={p.id} style={{ marginBottom: 20 }}>
          <Link to={`/post/${p.id}`}>
            <h2>{p.title}</h2>
          </Link>
          <p>{p.content.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}
