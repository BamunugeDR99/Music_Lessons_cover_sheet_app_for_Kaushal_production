import React, { useEffect, useState , Component} from 'react'
import axios from 'axios';
// import "./AutoComplete.css";
export default function Search(props){


  const [searchtext, setSearchtext] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [resfound, setResfound] = useState(true);
  const [myOptions, setMyOptions] = useState([])
  const [opID, setMyOpID] = useState([])
  const [covers, setCovers] = useState([])
  // let [value, setValue]=useState([]);


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
                //  setMyOptions(myOptions)

                }).catch((err) => {
                    alert(err);
                  });        
               
    }
getData();
},[])




console.log(myOptions)

  const handleChange = (e) => {
    let searchval = e.target.value;
    let suggestion = [];
    if (searchval.length > 0) {
      suggestion = myOptions
        .sort()
        .filter((e) => e.toLowerCase().includes(searchval.toLowerCase()));
      setResfound(suggestion.length !== 0 ? true : false);
    }
    setSuggest(suggestion);
    setSearchtext(searchval);
  };

  const suggestedText = (value) => {
    console.log(value);
    setSearchtext(value);
    setSuggest([]);
  };

  const getSuggestions = () => {
    if (suggest.length === 0 && searchtext !== "" && !resfound) {
      return <p>Search Content Not Found</p>;
    }

    return (
      <ul>
        {suggest.map((item, index) => {
          return (
            <div key={index}>
              <li onClick={() => suggestedText(item)}>{item}</li>
        {/* {console.log(item._id)} */}
              {index !== suggest.length - 1 && <hr />}
            </div>
          );
        })}
      </ul>
    );
  };
  return (
    <div>
    <div style={{border: '1px solid gray',padding: '5px', width: '30%',borderRadius: '10px', color:'#000000'}}>
      <input
        type="text"
        placeholder="Search by Cover Name"
        className="search"
        value={searchtext}
        onChange={handleChange}
        style={{lineHeight: '10px',width: '100%',outline: 'none',border: 'none', color:'#000000'}}
      />
      {getSuggestions()}
      
    </div>
    <button class="btn" type="submit" style={{color:"#764A34", border: "2px solid #764A34"}} 
    // onClick={() => { searchCover(); }}
   >Search</button>
   </div>
  );
};
