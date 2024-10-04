// src/notification-service.js
import axios from 'axios';

//after you announce on frontend, then you insert hash to send notification that you aanounce txn
export const sendNotification = async (hash) => {
  let data = JSON.stringify({
    "userAdress": localStorage.getItem("address"),
    "hash": hash,
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

//save you user and device credential
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

//try to get txn status
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

