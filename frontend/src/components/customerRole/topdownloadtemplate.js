import React from "react";
import { storage } from "../../Configurations/firebaseConfigurations";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";

export default function TopDownloadTemplate(props) {
  async function displayImages() {
    const storageRef = ref(storage, `PreviewImages/${props.imageName}`);

    await getDownloadURL(storageRef)
      .then((url) => {
        document.getElementById("image").src = url;
        document.getElementById("temp").hidden = true;
        document.getElementById("image").hidden = false;

        console.log(url);
      })
      .catch((err) => {
        console.log(err);
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
                id="temp"
                src={"/images/imageplaceholder.png" }
                class="card-img-top"
                alt="..."
                style={{ borderRadius: "15px 15px 0px 0px", height: "350px" }}
              />
          <img
            hidden
            id="image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/imageplaceholder.png";
            }}
            src={displayImages()}
            class="card-img-top"
            alt="..."
            style={{ borderRadius: "15px 15px 0px 0px", height: "350px" }}
          />
          <div class="card-body">
            <h4 class="card-title" style={{ fontWeight: "bold" }}>
              {props.title}
            </h4>
            <h5>{props.artist}</h5>
            <h5>{props.category}</h5>
            <h5>{props.maincat}</h5>
            <h5>{props.subcat}</h5>
            <h5 style={{ float: "right", color: "#764A34" }}>
              <b>US$ {props.price}</b>
            </h5>
          </div>
        </div>
      </main>
    </div>
  );
}
