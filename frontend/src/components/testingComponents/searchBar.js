// import React, { useEffect, useState , Component} from 'react'
// import ReactSearchBox from "react-search-box";
// import axios from 'axios';
// import {Input , Card} from "axios"

// export default function Search(props){

// // const [myOptions, setMyOptions] = useState([])
// const [text, setText] = useState([])
// const [covers, setCovers] = useState([])
// const [suggetions, setSuggetions] = useState([])

// // let [value, setValue]=useState([]);

// let data=[];

// let number=0;
    
// useEffect(()=>{
//     const loadUsers = async () => {
//         const response = await axios.get('https://kaushal-rashmika-music.herokuapp.com/covers/getcovers')
//         setCovers(response.data)
//     }
//     loadUsers();

// },[])
// console.log(covers)

// function onChangeHandler(text){
//     let matches =[];
//     if(!text){
//         setSuggetions([]);
//     }
//     else{
//         for(let i=0; i<covers.length; i++){
//             matches=covers[i].Title
//         }
//         // matches=covers.Title
//             matches = covers.filter((cov)=>{
//             const regex = new RegExp(`${text}`,"gi");
//             return covers.Title.match(regex);
//         })
    
//     }
//     console.log(matches)
//     setSuggetions(matches)
   
//     setText(text)
// }

// return (

//     <div className="container">
//         <input type="text" className="col-md-12 input" style={{margin:'20px'}}
//         onChange={e => onChangeHandler(e.target.value)}
//         value={text}
            
//         />

//     {suggetions.map((suggetion,i) => {
//         return (
//         <div key={i} className='col-md-12 justify-content-md-center'>
//             <div className="card">
//             {suggetion.Title}
//             </div>
//             </div>
//         )})}
//     </div>
// );



// }



// import React, { useEffect, useState, Component } from "react";
// import axios from "axios";
// import './App.css'
// import { ReactSearchAutocomplete } from 'react-search-autocomplete'

// export default function SearchBar(props){

    // const [searchtext, setSearchtext] = useState("");
    // const [suggest, setSuggest] = useState([]);
    // const [resfound, setResfound] = useState(true);
    // let [myOptions, setMyOptions] = useState([]);
    // const [opID, setMyOpID] = useState([]);
    // const [items, setItems] = useState([]);
    // let [value, setValue] = useState([]);
    // let items=[]
  
    // useEffect(() => {
    //     function getData() {
    //         axios
    //           .get("https://kaushal-rashmika-music.herokuapp.com/covers/getcovers")
    //           .then((res) => {
    //             setItems(res.data);
                // items=res.data
                // console.log(items)
                // for (var i = 0; i < res.data.length; i++) {
                // //   setValue(res.data);
                // //   myOptions.push(res.data[i].Title);
                // setItems(res.data[i].Title);
                // console.log(items)
                // }
    //           })
    //           .catch((err) => {
    //             alert(err);
    //           });
    //     }
    //   getData();
    // }, []);
  
 
    // console.log(items)


//   const items = [
//     {
//       id: 0,
//       name: 'Cobol'
//     },
//     {
//       id: 1,
//       name: 'JavaScript'
//     },
//     {
//       id: 2,
//       name: 'Basic'
//     },
//     {
//       id: 3,
//       name: 'PHP'
//     },
//     {
//       id: 4,
//       name: 'Java'
//     }
//   ]

//   const handleOnSearch = (string, results) => {
//     // onSearch will have as the first callback parameter
//     // the string searched and for the second the results.
//     console.log(string, results)
//   }

//   const handleOnHover = (result) => {
//     // the item hovered
//     console.log(result)
//   }

//   const handleOnSelect = (item) => {
//     // the item selected
//     console.log(item)
//   }

//   const handleOnFocus = () => {
//     console.log('Focused')
//   }

//   const formatResult = (item) => {
//     return item
//     // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <div style={{ width: 400 }}>
//           <ReactSearchAutocomplete
//             items={items}
//             onSearch={handleOnSearch}
//             onHover={handleOnHover}
//             onSelect={handleOnSelect}
//             onFocus={handleOnFocus}
//             autoFocus
//             formatResult={formatResult}
//           />
//         </div>
//       </header>
//     </div>
//   )
// }

// export default App