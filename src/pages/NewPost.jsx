import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const createPost = async () => {
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    if (!user) {
      alert("You must be logged in to write a post.");
      return;
    }

    const { error, data: post } = await supabase.from("posts").insert({
      title,
      content,
      user_id: user.id
    }).select().single();

    if (error) alert(error.message);
    else navigate(`/post/${post.id}`);
  };

  const post_title={
    width: "100%",
    padding: 12,
    margin: "10px 0",
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 16,
  }

  const postContent = {
  
  }

  const button = {
    backgroundColor:'black',
    color:'white',
    padding:3,
    width:90,
    marginTop:130
  }
  return (
    <div style={{ padding: 2}}>
      <h1>Write a new post</h1>

      <input style = {post_title} placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea style = {postContent} placeholder="Content" onChange={e => setContent(e.target.value)} />

      <button style={button} onClick={createPost}>Publish</button>
    </div>
  );
}
