import React  from "react";
// import "./../../css/covercard.css";
import { storage } from "../../Configurations/firebaseConfigurations";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";


export default function CoverTemplate(props) {
  async function displayImages(coverImageName, index) {
    // console.log(coverImageName);
    // console.log(index);
    const storageRef = ref(storage, `PreviewImages/${coverImageName}`);
    await getDownloadURL(storageRef)
      .then((url) => {
        document.getElementById(index).src = url;
      })
      .catch((err) => {
        // ErrorhandlingTxt("Reccomended covers are not available right now!");
      });
  }
  return (
    <div>
      <main>
        <div
          class="card"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
            borderRadius: "15px",
            marginRight: "15px",
            marginLeft: "15px",
          }}
        >
          <img
            id={props.id}
            src={
              displayImages(props.imageName, props.id) ||
              "/images/Imageplaceholder.png"
            }
            class="card-img-top"
            alt="..."
            style={{ borderRadius: "15px 15px 0px 0px", height: "300px" }}
          />
          <div class="card-body">
            <p class="card-title" style={{ fontWeight: "bold" }}>
              {props.title}
            </p>
            <h5>{props.artist}</h5>
            <h5>{props.category}</h5>
            <h5 style={{ float: "right", color: "#764A34" }}>
              <b>US$ {props.price}</b>
            </h5>
          </div>
        </div>
      </main>
    </div>
  );
}