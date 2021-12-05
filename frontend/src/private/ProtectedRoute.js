import React from "react";
import { Redirect, Route } from "react-router";
import authentication from "../security/authentication";

export default function ProtectedRoute({component : Component, ...rest}){
    // call an useeffect and using the database check user is logged in or not 
    return (
        <Route 
        {...rest}
        render={
            props => {
                if(authentication.isAuthenticated()){
                    return <Component {...props}/>

                }else{
                    return <Redirect to = {{
                        pathname : "/adminlogin",
                        state : {
                            from : props.location
                        }
                    }

                    }/>
                }
            }
        }/>
    );
}