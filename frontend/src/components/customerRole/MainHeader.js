import React from "react";
import CustomerHeaderTempBeforeLogin from "./CustomerHeaderTempBeforeLogin";
import CustomerHeaderTemp from "./CustomerHeaderTemp";
class MainHeader extends React.Component {
    render() {
      return sessionStorage.getItem("IsAuth") ? <CustomerHeaderTemp />:<CustomerHeaderTempBeforeLogin /> 
    }
  }

  export default MainHeader;