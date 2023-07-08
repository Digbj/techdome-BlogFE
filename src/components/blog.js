import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/post');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h3>Most Read Digit Blog</h3>
      <div className="myp">
        {posts.length > 0 &&
          posts.map((data) => (
            <div className="post" key={data._id}>
              <div className="cov">
                <Link to={`/singlepost/${data._id}`}>
                  <img className="cov" src={`http://localhost:8000/${data?.cover}`} alt="" />
                </Link>
              </div>
              <h5>Title:<span>{data?.title}</span></h5>
              <p>Summary:</p>
              {data.content.slice(3, 40)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Blog;
