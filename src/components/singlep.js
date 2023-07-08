import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/post/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }
console.log(post)
  return (
    <div>
      <h4>Detailed Post Page</h4>
      <div>
        <div> <img className="cov1" src={`http://localhost:8000/${post?.cover}`} alt="" /></div>
        <div className="det">
        <h5>Title: {post.title}</h5>
        <h5>Written By:{post?.author?.name}</h5>
        <h5>CreatedAt:{post?.createdAt.slice(0,10)}</h5>
        </div>
       <div className="post1">
       <p>{post.content.replace(/<\/?p>/gi, "")}</p>
       </div>
       
      </div>
    </div>
  );
};

export default SinglePost;
