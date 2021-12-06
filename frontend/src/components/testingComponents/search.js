import React, { useEffect, useState , Component} from 'react'
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import ReactSearchBox from "react-search-box";
import axios from 'axios';

export default function Search(props){

const [myOptions, setMyOptions] = useState([])
const [opID, setMyOpID] = useState([])
const [covers, setCovers] = useState([])
let [value, setValue]=useState([]);

let data=[];

let number=0;
    
useEffect(()=>{
    function getData(){
        axios
            .get("https://kaushal-rashmika-music.herokuapp.com/covers/getcovers")
            .then((res) => {
                // console.log(res.data)
                setCovers(res.data)
                for (var i = 0; i < res.data.length; i++) {
                    myOptions.push(res.data[i].Title)
                    opID.push(res.data[i]._id)
                    // console.log(res.data[i]._id)
                }
                 setMyOptions(myOptions)

                }).catch((err) => {
                    alert(err);
                  });        
               
    }
getData();
},[])


// console.log(covers)


    function getDataFromAPI(value, id){  
        console.log(value)
        // console.log(myOptions)
        // axios.get("http://localhost:8070/covers/getcovers")
        // .then((res)=>{
          // console.log(res.data)
          
          for(let i = 0; i < myOptions.length; i++){
              if(myOptions[i] == value){
                number=1;
                // console.log("Successful")
              }
              else{
                // console.log('Unsuccesful')
              }
          }
          if(number==1){
            console.log("Successful")
          }
          else{
            console.log('Unsuccesful')
          }
        // })
    }

    
    // function searched(){
    //    if(number==1){
    //         console.log("Successful")
    //       }
    //       else{
    //         console.log('Unsuccesful')
    //       }
    // }

    // data = [
    //     {
    //       key: "john",
    //       value: "John Doe",
    //     },
    //     {
    //       key: "jane",
    //       value: "Jane Doe",
    //     },
    //     {
    //       key: "mary",
    //       value: "Mary Phillips",
    //     },
    //     {
    //       key: "robert",
    //       value: "Robert",
    //     },
    //     {
    //       key: "karius",
    //       value: "Karius",
    //     },
    //   ];


return (
    // <div className="row">
	<div style={{margin:'20px'}}>
	<input
		style={{ width: 500 }}
		freeSolo
		autoComplete
		autoHighlight
		options={myOptions}
		renderInput={(params) => (
		<textarea {...params}
        onChange={(e) => {getDataFromAPI(e.target.value);}}
			// onClick={getDataFromAPI}
			variant="outlined"
			label="Search Box"
		/>
		)}
        
	/>

        



     {/* <button class="btn" type="submit" style={{color:"#764A34", border: "2px solid #764A34"}} 
    onClick={() => { props.history.push("/customer/detailedcover/" + opID) }}
      >Search</button>
    <br/><br/> */}
    
	</div>
    
    /* </div> */
);



}

// "https://kaushal-rashmika-music.herokuapp.com/covers/getcovers"

// export default App
