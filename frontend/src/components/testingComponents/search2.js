import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import "../../css/searchBarStyles.css";
import { TextField, validator } from "react-textfield";
export default function Search(props) {
  const [searchtext, setSearchtext] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [resfound, setResfound] = useState(true);
  let [myOptions, setMyOptions] = useState([]);
  const [opID, setMyOpID] = useState([]);
  const [covers, setCovers] = useState([]);
  let [value, setValue] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    if (myOptions.length <= 0) {
      axios
        .get("https://kaushal-rashmika-music.herokuapp.com/covers/getcovers")
        .then((res) => {
          setCovers(res.data);
          for (var i = 0; i < res.data.length; i++) {
            setValue(res.data);
            myOptions.push(res.data[i].Title);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }
  function getCover(searchtext) {
    // console.log(searchtext)
    // console.log(value)
    for (let i = 0; i < value.length; i++) {
      if (searchtext == value[i].Title) {
        // console.log(value[i]._id)
        props.history.push("/customer/detailedcover/" + value[i]._id);
      }
    }
  }

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
  let c = 1;
  let k = [];

  let getSuggestions = () => {
    {
      console.log(suggest.length);
    }
    if (suggest.length === 0 && searchtext !== "" && !resfound) {
      return (
        <p style={{ height: "30px", paddingTop: "3px" }}>
          &ensp;Search Content Not Found
        </p>
      );
    }
    // else if(suggest.length>5){
    return (
      (k = suggest.slice(0, 5)),
      // setSuggest(suggest.slice(0,5)),
      console.log(k),
      (
        <ul
          style={{
            overflowY: "scroll",
            height: "20%",
            overflowY: "hidden",
            listStyle: "none",
          }}
        >
          {/* <select> */}
          {k.map((item, index) => {
            return (
              <div key={index}>
                {/* <options onClick={() => suggestedText(item)}>{item}  </options> */}
                <li
                  style={{ height: "30px", paddingTop: "3px" }}
                  onClick={() => suggestedText(item)}
                >
                  &ensp;{item}
                </li>
                {index !== suggest.length - 1}
                {/* {c <= 5 ? "bla": "as"} */}
              </div>
            );
          })}
          {/* </select> */}
        </ul>
      )
    );
    // }
  };

  return (
    <div>
      <div className="MainSearchBar">
        <div class="wrapper ">
          <div class="search-input" id="searchInput">
            <a href="" target="_blank" hidden></a>
            <input
              type="text"
              placeholder="Type to search.."
              value={searchtext}
              onChange={handleChange}
              style={{ color: "#000000" }}
            />

            {getSuggestions()}

            <div class="icon" onClick={getCover(searchtext)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
