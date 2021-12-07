import React from "react";
import { useIdleTimer } from 'react-idle-timer'



export default function IdelTimer(props) {
    const handleOnIdle = event => {
      sessionStorage.removeItem("IsAuth");
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


