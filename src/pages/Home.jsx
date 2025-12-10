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

  const card ={ 
    marginBottom: 20, 
    borderBottom:'1px solid gray'
  }
  const list={
    marginBottom:40,
    display:'flex',
    flexDirection:'row',
    listStyle:'none',
    gap:20,
    borderBottom:'1px solid gray'
  }
  return (
    <div style={{ padding: 20 }}>
      <nav>
        <ul style={list}>
          <li>For you</li>
          <li>Feature</li>
        </ul>
      </nav>

      {posts.map((p) => (
        <div key={p.id} style={card}>

          <Link style= {{textDecoration:'none'}}to={`/post/${p.id}`}>
            <h2 style={{color:'black'}}>{p.title}</h2>
          </Link>
          <p>{p.content.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}
