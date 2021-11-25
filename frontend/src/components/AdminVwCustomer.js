import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import DataTable from "datatables.net";
import $ from "jquery";

export default function AdminVwCustomer(props) {

const [customers, setCustomers]=useState([]);
// let [customers, setCustomers]=useState("");
let customer =[];

useEffect(()=>{
    function getCustomers(){

        axios.get("http://localhost:8070/customer/getAll")
        .then((res)=>{
            console.log(res.data);

            // customer=res.data;
            // console.log(customer);
            // setCustomers(customer);

            setCustomers(res.data);
            console.log(customers);       
            
            
$(document).ready(function () {
    $("#example").DataTable();
  });
        })  
        .catch((err) => {
            alert(err);
          });
       
    }
    getCustomers();

},[]);


  return (
 
            <table class="table table-striped" id="example">
            <thead>
        
                <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact No</th>
                <th scope="col">Country</th>
                <th scope="col">Login Status</th>
                </tr>
               
            </thead>
            <tbody>
            {    console.log(customers)}
                {customers.map((cus)=>{
                    return(
                <tr>
                    {/* <th scope="row"></th> */}
                    <td>{cus.FirstName}</td>
                    <td>{cus.LastName}</td>
                    <td>{cus.Email}</td>
                    <td>{cus.ContactNumber}</td>
                    <td>{cus.Country}</td> 
                    {/*  */}
                    <td>{cus.LoginStatus}
                    {(() => {
                  if (cus.LoginStatus == true){
                    return (
                        <span class="text-success">Online &ensp;<i class="fas fa-circle"  style={{color:'green'}}></i></span>
                    )}
                  return <span class="text-danger">Offline &ensp;<i class="fas fa-circle"  style={{color:'red'}}></i></span>
                  })()}
                  </td>
                </tr>
                    )
                 })}
            </tbody>
            </table>

  );
}




