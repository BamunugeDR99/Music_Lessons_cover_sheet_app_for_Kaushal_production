import React from "react";

export default function Footer(props) {
  return (
    <footer
      class="page-footer font-small "
      style={{
        backgroundColor: "#764A34",
        
        position:"relative",
        bottom:"0",
      
        marginBottom:"0px",
        width:"100%",
      

        
      }}
    >
      <div class="container">
        <div class="row">
          <div class="col-md-12 py-5">
            <div class="mb-5 flex-center">
              {/* facebook link */}
              <a class="fb-ic">
                <i class="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x">
                  {" "}
                </i>
              </a>

              {/* twitter link */}
              <a class="tw-ic">
                <i class="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x">
                  {" "}
                </i>
              </a>

              {/* Gplus link */}
              <a class="gplus-ic">
                <i class="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x">
                  {" "}
                </i>
              </a>

              {/* Linkedin link */}
              <a class="li-ic">
                <i class="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x">
                  {" "}
                </i>
              </a>

              {/* instargram link */}
              <a class="ins-ic">
                <i class="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x">
                  {" "}
                </i>
              </a>

              {/* pinterest link */}
              <a class="pin-ic">
                <i class="fab fa-pinterest fa-lg white-text fa-2x"> </i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-copyright text-center py-3">
        © 2021 Copyright:
        <a href="https://mdbootstrap.com/"> Rashmika Productions</a>
        <p>Published by GGWP</p>
      </div>
    </footer>
  );
}
