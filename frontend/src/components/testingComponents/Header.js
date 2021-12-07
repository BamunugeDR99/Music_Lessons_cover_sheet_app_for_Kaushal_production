import React from "react";
import LoginHeader from "./LoginHeader";
import OtherHeader from "./OtherHeader";

class Header extends React.Component {
   isLoggedin(){

   }
    render() {
      return true ? <LoginHeader />:<OtherHeader /> 
    }
  }

  export default Header;