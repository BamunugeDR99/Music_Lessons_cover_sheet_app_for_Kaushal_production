import React, { useState } from "react";
import axios from "axios";
import CurrencySelect from "./CurrencySelect";
export default function CurrencyExchange(props) {
    const api = "https://api.exchangerate-api.com/v4/latest/USD";
function exchangeCurreny(e){
    e.preventDefault();
// include api for currency change


// for selecting different controls
// var search = document.querySelector(".searchBox");
// var convert = document.querySelector(".convert");
// var fromCurrecy = document.querySelector(".from");
// var toCurrecy = document.querySelector(".to");
// var finalValue = document.querySelector(".finalValue");
// var finalAmount = document.getElementById("finalAmount");
// var resultFrom;
// var resultTo;
// var searchValue;
// let currency = "USD";
fetch(`${api}`)
.then(currency => {
    return currency.json();
}).then(displayResults);
// // Event when currency is changed
// fromCurrecy.addEventListener('change', (event) => {
// 	resultFrom = `${event.target.value}`;
// });

// // Event when currency is changed
// toCurrecy.addEventListener('change', (event) => {
// 	resultTo = `${event.target.value}`;
// });

// search.addEventListener('input', updateValue);

// // function for updating value
// function updateValue(e) {
// 	searchValue = e.target.value;
// }

// when user clicks, it calls function getresults
//convert.addEventListener("click", getResults);





// // when user click on reset button
// function clearVal() {
// 	//window.location.reload();
// 	document.getElementsByClassName("finalValue").innerHTML = "";
// };

}

// display results after convertion
function displayResults(currency) {
    // console.log(currency.rates["LKR"]);
    const currencyRate = currency.rates["LKR"];
    const value = 2;
    const afterCurrencyChange = value * currencyRate;
    //alert(afterCurrencyChange.toFixed(2));
    console.log(document.getElementById("currencyX").value)

}


// function getresults
function getResults() {
	fetch(`${api}`)
		.then(currency => {
			return currency.json();
		}).then(displayResults);
}
    return (
        <div>
            <form onSubmit = {exchangeCurreny}>
            <CurrencySelect/>
            <button type= "submit">submit</button>
            </form>
        </div>
    );
}

