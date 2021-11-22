import React from "react";
import "../../css/login.css";

export default function MusicCart(props) {

    return (
        <div className="container">
            <div
                style={{ alignContent: "center" }}
                className="d-flex justify-content-center mt-2"
            >
                <h2 class="mb-4" style={{ alignContent: "center", fontWeight: "bold", color: "#764A34" }}>
                    My Shopping Cart
                </h2>
            </div>

            <section >
                <div class="row" >
                    <div class="col-lg-8">
                        <div class="mb-3">

                            <div class="card mb-3" >
                                <div class="row no-gutters">
                                    <div class="col-md-4 mt-3 clsImg ">

                                        <img alt="Card image cap" class="card-img-top embed-responsive-item" src="images/back1.jfif" />


                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 style={{ fontWeight: "bold" }} >Ride it</h5>
                                            <p class="mb-0 text-uppercase small" style={{ color: "#764A34", fontWeight: "bold" }} >{`Original Artist :`} <span style={{ color: "#000000" }}>Jay Sean</span></p>
                                            <p class="mb-0  text-uppercase small" style={{ color: "#764A34", fontWeight: "bold" }} >{`Arranged by :`} <span style={{ color: "#000000" }}>Kaushal Rashmika</span></p>
                                            <p class="mb-0" style={{ fontWeight: "bold" }}>Rs.750.00</p>
                                            <button
                                                type="button"
                                                class="btn "
                                                style={{ backgroundColor: "#D0193A", color: "white" }}
                                            >
                                                <i class="fas fa-trash-alt mr-1"></i>Remove
                                                item
                                            </button>
                                        </div>
                                    </div>



                                </div>
                            </div>



                            <div class="card mb-3" >
                                <div class="row no-gutters">
                                    <div class="col-md-4 mt-3 clsImg ">

                                        <img alt="Card image cap" class="card-img-top embed-responsive-item" src="images/back1.jfif" />


                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 style={{ fontWeight: "bold" }} >Ride it</h5>
                                            <p class="mb-0 text-uppercase small" style={{ color: "#764A34", fontWeight: "bold" }} >{`Original Artist :`} <span style={{ color: "#000000" }}>Jay Sean</span></p>
                                            <p class="mb-0  text-uppercase small" style={{ color: "#764A34", fontWeight: "bold" }} >{`Arranged by :`} <span style={{ color: "#000000" }}>Kaushal Rashmika</span></p>
                                            <p class="mb-0" style={{ fontWeight: "bold" }}>Rs.750.00</p>
                                            <button
                                                type="button"
                                                class="btn "
                                                style={{ backgroundColor: "#D0193A", color: "white" }}
                                            >
                                                <i class="fas fa-trash-alt mr-1"></i>Remove
                                                item
                                            </button>
                                        </div>
                                    </div>



                                </div>
                            </div>


                        </div>


                    </div>






                    {/* Cart Calculations */}
                    <div class="col-lg-4  justify-content-end">
                        <div class="mb-6 ">
                            <div class="pt-3">


                                <h5 class="mb-3" style={{ fontWeight: "bold" }}>The Total Amount of</h5>
                                <ul class="list-group list-group-flush">

                                    {/* Temporary Amount */}
                                    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Temporary Amount
                                        <input
                                            class="border-0 border-none"
                                            type="text"
                                            id="GrandTotal"
                                            value="750.00"
                                            style={{ fontWeight: "bold" }}
                                            readOnly
                                        />
                                    </li>

                                    {/* Sub Total */}
                                    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Sub Total</strong>

                                        </div>
                                        <input
                                            class="border-0 border-none"
                                            type="text"
                                            id="GrandTotal2"
                                            value="750.00"
                                            style={{ fontWeight: "bold" }}
                                            readOnly
                                        />
                                    </li>
                                </ul>


                                {/* Checkout Button */}
                                <button
                                    type="button"
                                    class="btn  btn-block"
                                    style={{ backgroundColor: "#279B14", color: "white" }}

                                >
                                    <i class="bi bi-arrow-right"></i>
                                    Go to Checkout

                                </button>

                                <br /><br />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}