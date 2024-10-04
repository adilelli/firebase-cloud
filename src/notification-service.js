// src/notification-service.js
import axios from 'axios';

export const sendNotification = async () => {
  let data = JSON.stringify({
    "userAdress": localStorage.getItem("address"),
    "hash": "D042FD09627C23768E82651E016523C0F7EDF577821F01BA1DE2855C1CDD86AB",
    "fcmSender": localStorage.getItem("fcmToken") });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://stg-moei-gateway.proximaxtest.com/firebase/notification/announce',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
  
};

export const saveFcm = async (fcmToken, address) =>{
  let data = JSON.stringify({
    "userId": address,
    "fcmToken": fcmToken,
    "platform": "WEB"
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://stg-moei-gateway.proximaxtest.com/firebase/user/save',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });

}

export const fetchTxnStatus = async(address) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://stg-moei-gateway.proximaxtest.com/firebase/notification/status/'+ address,
    headers: { }
  };

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
}

