import React from "react";

export default function MusicCart(props) {

    return (
        <div className="container">
            <section >
                <div class="row" >
                    <div class="col-lg-8">
                        <div class="mb-3">
                            <div class="pt-4 wish-list">
                                <div
                                    style={{ alignContent: "center" }}
                                    className="d-flex justify-content-center"
                                >
                                    <h2 class="mb-4" style={{ alignContent: "center", fontWeight: "bold", color: "#764A34" }}>
                                        My Shopping Cart
                                    </h2>
                                </div>

                                
                                <div className="shadow p-3 mb-5 bg-white rounded">
                                    <div class="row mb-4 border-primary">
                                        <div class="col-md-5 col-lg-3 col-xl-3">
                                            <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                                <img class="img-fluid w-100"
                                                    src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg" alt="Sample" />
                                                <a href="#!">
                                                    <div class="mask">
                                                        <img class="img-fluid w-100"
                                                            src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg" alt="Sample"
                                                        />
                                                        <div class="mask rgba-black-slight"></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="col-md-7 col-lg-9 col-xl-9">
                                            <div>
                                                <div class="d-flex justify-content-between">
                                                    <div>
                                                        <h5 style={{ fontWeight: "bold" }} >Ride it</h5>
                                                        <p class="mb-6 text-uppercase small" style={{ color: "#764A34", fontWeight: "bold" }} >{`Original Artist :`} <span style={{ color: "#000000" }}>Jay Sean</span></p>
                                                        <p class="mb-3  text-uppercase small" style={{ color: "#764A34", fontWeight: "bold" }} >{`Arranged by :`} <span style={{ color: "#000000" }}>Kaushal Rashmika</span></p>

                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div >

                                                        <button
                                                            type="button"
                                                            class="btn "
                                                            style={{ backgroundColor: "#D0193A", color: "white" }}
                                                        >
                                                            <i class="fas fa-trash-alt mr-1"></i>Remove
                                                            item
                                                        </button>
                                                    </div>
                                                    <p class="mb-0" style={{ fontWeight: "bold" }}>Rs.750.00</p>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </div>



                                <div className="shadow p-3 mb-5 bg-white rounded">
                                    <div class="row mb-4 border-primary">
                                        <div class="col-md-5 col-lg-3 col-xl-3">
                                            <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                                <img class="img-fluid w-70 "
                                                    src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg" alt="Sample" />
                                                <a href="#!">
                                                    <div class="mask">
                                                        <img class="img-fluid w-70 "
                                                            src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg" alt="Sample"
                                                        />
                                                        <div class="mask rgba-black-slight"></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="col-md-7 col-lg-9 col-xl-9">
                                            <div>
                                                <div class="d-flex justify-content-between">
                                                    <div>
                                                        <h5 style={{ fontWeight: "bold" }} >Ride it</h5>
                                                        <p class="mb-6 text-uppercase small" style={{ color: "#764A34", fontWeight: "bold" }} >{`Original Artist :`} <span style={{ color: "#000000" }}>Jay Sean</span></p>
                                                        <p class="mb-3  text-uppercase small" style={{ color: "#764A34", fontWeight: "bold" }} >{`Arranged by :`} <span style={{ color: "#000000" }}>Kaushal Rashmika</span></p>

                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div >

                                                        <button
                                                            type="button"
                                                            class="btn "
                                                            style={{ backgroundColor: "#D0193A", color: "white" }}
                                                        >
                                                            <i class="fas fa-trash-alt mr-1"></i>Remove
                                                            item
                                                        </button>
                                                    </div>
                                                    <p class="mb-0" style={{ fontWeight: "bold" }}>Rs.750.00</p>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </div>




                            </div>
                        </div>


                    </div>

                    <div class="col-lg-4">
                        <div class="mb-6 ">
                            <div class="pt-3">
                             
                               
                                <h5 class="mb-3" style={{ fontWeight: "bold" }}>The Total Amount of</h5>

                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Temporary Amount
                                        <input
                                            class="border-0"
                                            type="text"
                                            id="GrandTotal"
                                            value="750.00"
                                            style={{ fontWeight: "bold" }}
                                            readOnly
                                        />
                                    </li>

                                    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Sub Total</strong>

                                        </div>
                                        <input
                                            class="border-0"
                                            type="text"
                                            id="GrandTotal2"
                                            value="750.00"
                                            style={{ fontWeight: "bold" }}
                                            readOnly
                                        />
                                    </li>
                                </ul>

                                <button
                                    type="button"
                                    class="btn  btn-block"
                                    style={{ backgroundColor: "#279B14", color: "white" }}

                                >
                                    <i class="bi bi-arrow-right"></i>
                                    Go to Checkout

                                </button>

                                <br/><br/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

            )
}