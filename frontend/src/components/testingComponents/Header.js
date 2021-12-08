import React from "react";
import LoginHeader from "./LoginHeader";
import OtherHeader from "./OtherHeader";

class Header extends React.Component {
    render() {
      return sessionStorage.getItem("IsAuth") ? <LoginHeader />:<OtherHeader /> 
    }
  }

  export default Header;