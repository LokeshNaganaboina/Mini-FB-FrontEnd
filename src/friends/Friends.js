import React, {useEffect, useState} from 'react';
import Navigation from '../navigation/Navigation';
import { Button } from 'react-bootstrap';
import './Friends.css'
import envConfig from '../configs/envConfig';
import axiosInstance from '../configs/axiosConfig';

const Friends = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allFriends, setAllFriends] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async() => {
      try{
        const response = await axiosInstance.get(`${envConfig.baseUrl}/api/user/all`);
        //console.log(response.data);
        // get the user info from the local storage and delete this user from the response.data
        setAllUsers(response.data);
      } catch(error) {
        console.log(error);
      }
    };

    fetchAllUsers();

  }, []);

  useEffect(() => {
    const fetchAllFriends = async() => {
      try{
        const response = await axiosInstance.get(`${envConfig.baseUrl}/api/friend`);
        //console.log(response.data);
        setAllFriends(response.data);
      } catch(error) {
        console.log(error);
      }
    };

    fetchAllFriends();

  }, []);

  const ifUserIsFriend = (user) => {
    const friends = allFriends.filter(friend => friend._id===user._id);
    if(friends.length > 0) return true;
    else return false;
  }

  const handleButtonClick = async (user) => {
    if(ifUserIsFriend(user)){
      console.log("unfriend the user");
    }
    else{
      try{
        const response = await axiosInstance.post(`${envConfig.baseUrl}/api/friend/sendrequest`, 
        {fromUserId: JSON.parse(localStorage.getItem('userInfo'))._id, toUserId: user._id}, {withCredentials: true});
        //console.log(response);
      } catch(error) {
        console.log(error);
      }
    }

  }

  return (
    <div className='friends-container'>
      <Navigation />
      <div className='friends-list'>
        {allUsers.map(user => (
          <div key={user._id} className='user-card'>
            {/* wrap this span inside a div and you can use flex to not let longer name go outside the div or overlap with the button */}
            <span className='username'>{user.username}</span>
            <Button 
            className={`friend-button ${ifUserIsFriend(user)? 'remove' : 'add'}`}
            onClick={() => handleButtonClick(user)}>
              {ifUserIsFriend(user) ? 'Remove Friends' : 'Add Friend'}
            </Button>
          </div>
        ))}

      </div>
    </div>
  )

};


export default Friends;