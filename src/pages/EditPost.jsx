import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    setPost(data);
  };

  const save = async () => {
    await supabase
      .from("posts")
      .update({
        title: post.title,
        content: post.content
      })
      .eq("id", id);

    navigate(`/post/${id}`);
  };

  if (!post) return "Loading...";
  const post_Title = {}
  const post_content = {}
  return (
    <div>
      <h1>Edit Post</h1>

      <input style={post_Title}
        value={post.title}
        onChange={e => setPost({ ...post, title: e.target.value })}
      />

      <textarea style={post_content}
        value={post.content}
        onChange={e => setPost({ ...post, content: e.target.value })}
      />

      <button onClick={save}>Save</button>
    </div>
  );


}
