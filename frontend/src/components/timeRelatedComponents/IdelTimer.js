import React from "react";
import axios from "axios";
import { useIdleTimer } from 'react-idle-timer'



export default function IdelTimer(props) {
    const handleOnIdle = event => {
      sessionStorage.removeItem("IsAuth");
      sessionStorage.removeItem("IsAuthA");

      if(sessionStorage.getItem("IsAuth") != null){
        const updateloginStatus = {
          LoginStatus: false,
        };

        let customerID = localStorage.getItem("CustomerID");

        axios
        .put("https://kaushal-rashmika-music.herokuapp.com/customer/loginStatus/" + customerID , updateloginStatus)
        .then((res) => {
          
          localStorage.removeItem("CustomerID");
          sessionStorage.removeItem("IsAuth");
          
        })
      }

      }
    
    //   const handleOnActive = event => {
    //     console.log('user is active', event)
    //     console.log('time remaining', getRemainingTime())
    //   }
    
    //   const handleOnAction = event => {
    //     console.log('user did something', event)
    //   }
    
      const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: 1800 * 10000,
        onIdle: handleOnIdle,
        // onActive: handleOnActive,
        // onAction: handleOnAction,
        debounce: 500
      })
  return <div>
     
  </div>;
}


