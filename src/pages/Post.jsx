import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadPost();
    supabase.auth.getUser().then((res) => setUser(res.data.user));
  }, []);

  async function loadPost() {
    const { data } = await supabase.from("posts").select("*").eq("id", id).single();
    setPost(data);
  }

  async function deletePost() {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (!error) navigate("/");
  }

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      {user?.id === post.user_id && (
        <>
          <Link to={`/edit/${post.id}`}>
            <button>Edit</button>
          </Link>
          
          <button onClick={deletePost} style={{ marginLeft: 10 }}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}
