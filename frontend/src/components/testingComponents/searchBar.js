import React, { useEffect, useState , Component} from 'react'
import ReactSearchBox from "react-search-box";
import axios from 'axios';
import {Input , Card} from "axios"

export default function Search(props){

// const [myOptions, setMyOptions] = useState([])
const [text, setText] = useState([])
const [covers, setCovers] = useState([])
const [suggetions, setSuggetions] = useState([])

// let [value, setValue]=useState([]);

let data=[];

let number=0;
    
useEffect(()=>{
    const loadUsers = async () => {
        const response = await axios.get('https://kaushal-rashmika-music.herokuapp.com/covers/getcovers')
        setCovers(response.data)
    }
    loadUsers();

},[])
console.log(covers)

function onChangeHandler(text){
    let matches =[];
    if(!text){
        setSuggetions([]);
    }
    else{
        for(let i=0; i<covers.length; i++){
            matches=covers[i].Title
        }
        // matches=covers.Title
            matches = covers.filter((cov)=>{
            const regex = new RegExp(`${text}`,"gi");
            return covers.Title.match(regex);
        })
    
    }
    console.log(matches)
    setSuggetions(matches)
   
    setText(text)
}






return (

    <div className="container">
        <input type="text" className="col-md-12 input" style={{margin:'20px'}}
        onChange={e => onChangeHandler(e.target.value)}
        value={text}
            
        />

    {suggetions.map((suggetion,i) => {
        return (
        <div key={i} className='col-md-12 justify-content-md-center'>
            <div className="card">
            {suggetion.Title}
            </div>
            </div>
        )})}
    </div>
);



}
