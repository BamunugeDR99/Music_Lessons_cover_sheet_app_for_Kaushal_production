import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

export default function Search(props){

const [myOptions, setMyOptions] = useState([])
const [opID, setMyOpID] = useState([])
const [covers, setCovers] = useState([])
let [value, setValue]=useState([]);

let number=0;
    
useEffect(()=>{
    function getData(){
        axios
            .get("http://localhost:8070/covers/getcovers")
            .then((res) => {
                console.log(res.data)
                setCovers(res.data)
                for (var i = 0; i < res.data.length; i++) {
                    myOptions.push(res.data[i].Title)
                    opID.push(res.data[i]._id)
                    console.log(res.data[i]._id)
                }
                 setMyOptions(myOptions)

                }).catch((err) => {
                    alert(err);
                  });        
               
    }
getData();
},[])


console.log(covers)


    function getDataFromAPI(value){  
        console.log(value)
        console.log(myOptions)
        // axios.get("http://localhost:8070/covers/getcovers")
        // .then((res)=>{
          // console.log(res.data)
          
          for(let i = 0; i < myOptions.length; i++){
              if(myOptions[i] == value){
                number=1;
              }
              else{
                // number=2;
              }
          }
          if(number==1){
            console.log("XXXXXXXXXXXXXXXXXXXX")
          }
          else{
            console.log('aaaaaaaaaaaaaaaaaaaa')
          }
        // })
    }

    
    // function getDataFromAPI(){
    //   console.log("Options Fetched from API")
    
    //   fetch(myOptions).then((response) => {
    //     return response.json()
    //   })
        
    // }


return (
    // <div className="row">
	<div style={{margin:'20px'}}>
	<Autocomplete
		style={{ width: 500 }}
		freeSolo
		autoComplete
		autoHighlight
		options={myOptions}
		renderInput={(params) => (
		<TextField {...params}
        onChange={(e) => {getDataFromAPI(e.target.value);}}
			// onClick={getDataFromAPI}
			variant="outlined"
			label="Search Box"
		/>
		)}
        
	/>
     <button class="btn  " type="submit" style={{color:"#764A34", border: "2px solid #764A34"}} 
    //   onClick={() => {selectCover(value); }}
      >Search</button>
    <br/><br/>
    
	</div>
    
    /* </div> */
);
}

// "http://localhost:8070/covers/getcovers"

// export default App
