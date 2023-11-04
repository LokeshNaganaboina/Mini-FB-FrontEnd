import React, { useEffect, useRef, useState } from 'react';
import './Timeline.css'; 
import PostCard from '../postcard/PostCard';
import Navigation from '../navigation/Navigation';
//import axios from 'axios';
import envConfig from '../configs/envConfig';
import axiosInstance from '../configs/axiosConfig';

const Posts = (props) => {
  if(props.posts != null) {
    return (
      props.posts.map(data => (
        <div key={data.post._id} className="post-card-container">
          <PostCard 
          user={data.user.username} 
          date={getDateTimeFormat(data.post.timestamp)} 
          body={data.post}
          likeButtonHandler={props.likeButtonHandler}
          dislikeButtonHandler={props.dislikeButtonHandler}/>
        </div>
      ))
    )
  }
  else {
    return (<div>Loading Posts.....</div>)
  }
}

const getDateTimeFormat = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = `${(date.getDate()).toString().padStart(2,'0')}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getFullYear()}`;
  return formattedDate;
}

const Timeline = () => {
  const [postData, setPostData] = useState(null);

  const fetchData = async() => {
    try {
      const response = await axiosInstance.get(`${envConfig.baseUrl}/api/user/timeline`,{withCredentials: true});
      setPostData(response.data);
    } catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickLikeButton = async (post) => {
    try{
      const reponse = await axiosInstance.post(`${envConfig.baseUrl}/api/post/like/${post._id.toString()}`, {},{withCredentials: true});
      console.log(reponse);
    } catch(error) {
      console.log(error);
    }
  
    fetchData();
  }
  
  const onClickDislikeButton = async (post) => {
    try{
      const reponse = await axiosInstance.post(`${envConfig.baseUrl}/api/post/dislike/${post._id.toString()}`, {}, {withCredentials: true});
      console.log(reponse);
    } catch(error) {
      console.log(error);
    }
  
    fetchData();
  }

  return (
    <div className='timeline-container'>
      <Navigation />
      <div className="timeline">
        <Posts posts={postData} likeButtonHandler={onClickLikeButton} dislikeButtonHandler={onClickDislikeButton}/>
      </div>
    </div>
    
  );
};

export default Timeline;
