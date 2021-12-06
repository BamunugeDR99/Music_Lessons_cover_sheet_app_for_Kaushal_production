import React, { useState} from "react";
import { useIdleTimer } from 'react-idle-timer'
import axios from "axios";
import authentication from "../../security/authentication";


export default function IdelTimer(props) {
    const handleOnIdle = event => {
        console.log('gg')
        const updateloginStatus = {
            LoginStatus: false,
          };
          // local storage prblem
        axios
        .put(
          "https://kaushal-rashmika-music.herokuapp.com/admin/loginStatus/" + localStorage.getItem("AdminID"),
          updateloginStatus
        )
        .then((res) => {


          authentication.logout(() => {
            props.history.push("/adminlogin")
            localStorage.removeItem("AdminID");

           })
        }).catch((err)=>{

        });
      }
    
    //   const handleOnActive = event => {
    //     console.log('user is active', event)
    //     console.log('time remaining', getRemainingTime())
    //   }
    
    //   const handleOnAction = event => {
    //     console.log('user did something', event)
    //   }
    
      const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: 555 * 1000,
        onIdle: handleOnIdle,
        // onActive: handleOnActive,
        // onAction: handleOnAction,
        debounce: 500
      })
  return <div>
     
  </div>;
}


