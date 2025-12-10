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
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();
    setPost(data);
  }

  async function deletePost() {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (!error) navigate("/");
  }

  if (!post) return <p>Loading...</p>;

  const containerStyle = {
    maxWidth: 700,
    margin: "40px auto",
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  };

  const titleStyle = {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#222",
  };

  const contentStyle = {
    fontSize: 18,
    lineHeight: 1.6,
    marginBottom: 30,
    textAlign: "center",
    color: "#555",
  };

  const buttonStyle = {
    padding: "8px 16px",
    fontSize: 16,
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#4CAF50",
    color: "#fff",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336",
    color: "#fff",
    marginLeft: 10,
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>{post.title}</h1>
      <p style={contentStyle}>{post.content}</p>

      {user?.id === post.user_id && (
        <div style={{ textAlign: "center" }}>
          <Link to={`/edit/${post.id}`} style={{ textDecoration: "none" }}>
            <button style={editButtonStyle}>Edit</button>
          </Link>
          <button onClick={deletePost} style={deleteButtonStyle}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
