import React, { useEffect, useState } from 'react';
import './Home.css'; // Import your custom CSS
//import axios from 'axios';
import Navigation from '../navigation/Navigation';
import { Button } from 'react-bootstrap';
import envConfig from '../configs/envConfig';
import axiosInstance from '../configs/axiosConfig';

const Home = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);

  const handlePost = async () => {
    try {
      await axiosInstance.post(`${envConfig.baseUrl}/api/user/post`, {postMessage: postText}, {withCredentials: true});
      setPostText('');
      fetchUserPosts();
    } catch(error) {
      console.log(error);
    }
    
  };

  const fetchUserPosts = async() => {
    try {
      const response = await axiosInstance.get(`${envConfig.baseUrl}/api/user/posts`, {withCredentials: true});
      setPosts(response.data);
    } catch(error){
      console.log(error);
    }
  };


  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchUserPosts();
  }, []);

  return (
    <div className="home-container">
      <Navigation />
      <div className="facebook-feed">
        <div className="user-profile">
          <h2>{user.username}</h2>
        </div>
        <div className="post-form">
          <input
            type="text"
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => (setPostText(e.target.value))}
          />
          <button onClick={handlePost}>Post</button>
        </div>
        <div className="feed">
          {posts.map(post => (
            <div key={post._id} className="post">
              <p>{post.post}</p>
              <button>{post.likes.length} Likes</button>
              <button>{post.dislikes.length} Dislikes</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
