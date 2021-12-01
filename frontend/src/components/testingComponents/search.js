import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

export default function Search(props){

const [myOptions, setMyOptions] = useState([])
const [covers, setCovers] = useState([])
    
useEffect(()=>{
    function getData(){
        axios
            .get("http://localhost:8070/covers/getcovers")
            .then((res) => {
                console.log(res.data)
                setCovers(res.data)
                for (var i = 0; i < res.data.length; i++) {
                    myOptions.push(res.data[i].Title)
                }
                 setMyOptions(myOptions)

                }).catch((err) => {
                    alert(err);
                  });        
               
    }
getData();
},[])


console.log(covers)


    function getDataFromAPI(){  
    }


return (
	<div style={{ marginLeft: '40%', marginTop: '60px' }}>
	<Autocomplete
		style={{ width: 500 }}
		freeSolo
		autoComplete
		autoHighlight
		options={myOptions}
		renderInput={(params) => (
		<TextField {...params}
			onChange={getDataFromAPI}
			variant="outlined"
			label="Search Box"
		/>
		)}
	/>
    <br/><br/>
	</div>
);
}

// "http://localhost:8070/covers/getcovers"

// export default App
