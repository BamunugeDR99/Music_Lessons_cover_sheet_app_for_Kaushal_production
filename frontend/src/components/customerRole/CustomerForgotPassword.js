import React, { useState } from "react";
import axios from "axios";

export default function CustomerForgotPassword(props) {
  const [stageOneStatus, setStageOneStatus] = useState(false);
  const [stageTwoStatus, setStageTwoStatus] = useState(true);
  const [stageThreeStatus, setStageThreeStatus] = useState(true);
  const [lockKeyImage, setLockKeyImage] = useState(false);
  const [unlockKeyImage, setUnLockKeyImage] = useState(true);

  return (
    <div>
      <br />
      <div className="d-flex justify-content-center">
        <div class="card" style={{ border: "solid #764A34" }}>
          <div class="card-body">
            <div class="text-center">
              <div hidden={lockKeyImage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  fill="currentColor"
                  class="bi bi-lock-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                </svg>
              </div>
              <div hidden = {unlockKeyImage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  fill="currentColor"
                  class="bi bi-unlock-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
                </svg>
              </div>
            </div>
            <br />
            <div class="text-center">
              <h2 style={{ color: "#764A34" }}>FORGOT PASSWORD ?</h2>
            </div>
            <br />
            <div class="text-center">
              <h5 style={{ color: "#000000" }}>
                You can reset your password here.
              </h5>
            </div>
            <br />
            {/* enter email field */}
            {/* stage 1 */}
            <div hidden={stageOneStatus}>
              <div class="input-group">
                {" "}
                <span class="input-group-append bg-white border-right-10">
                  <span class="input-group-text bg-transparent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="#764A34"
                      class="bi bi-envelope-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                    </svg>
                  </span>
                </span>
                <input
                  class="form-control border-left-0"
                  type="email"
                  id="userEmail"
                  placeholder="Enter Email"
                />
              </div>
              <br />
              {/* get code btn  */}
              <div class="text-center">
                <button
                  type="button"
                  class="btn btn-block"
                  style={{
                    backgroundColor: "#764A34",
                    color: "#ffffff",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    if (stageOneStatus == false) {
                      setStageTwoStatus(false);
                      setStageOneStatus(true);
                    }
                  }}
                >
                  Get Code
                </button>
              </div>
            </div>

            {/* stage 2 */}
            <div hidden={stageTwoStatus}>
              <div class="input-group">
                {" "}
                <span class="input-group-append bg-white border-right-10">
                  <span class="input-group-text bg-transparent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="#764A34"
                      class="bi bi-gear-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                    </svg>
                  </span>
                </span>
                <input
                  class="form-control border-left-0"
                  type="text"
                  id="userCode"
                  placeholder="Enter Code"
                />
              </div>
              <br />
              {/* verify code btn  */}
              <div class="text-center">
                <button
                  type="button"
                  class="btn btn-block"
                  style={{
                    backgroundColor: "#764A34",
                    color: "#ffffff",
                    borderRadius: "8px",
                  }}
                  onClick = {() => {
                      if(stageTwoStatus == false){
                          setStageThreeStatus(false);
                          setStageTwoStatus(true);
                          setLockKeyImage(true);
                          setUnLockKeyImage(false);
                      }
                  }}
                >
                  Verify Code
                </button>
              </div>
            </div>

            {/* stage 3 */}
            <div hidden={stageThreeStatus}>
              <div class="input-group">
                {" "}
                <span class="input-group-append bg-white border-right-10">
                  <span class="input-group-text bg-transparent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="#764A34"
                      class="bi bi-lock-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    </svg>
                  </span>
                </span>
                <input
                  class="form-control border-left-0"
                  type="password"
                  id="newPassword"
                  placeholder="Create New Password"
                />
              </div>
              <br />
              <div class="input-group">
                {" "}
                <span class="input-group-append bg-white border-right-10">
                  <span class="input-group-text bg-transparent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="#764A34"
                      class="bi bi-lock-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    </svg>
                  </span>
                </span>
                <input
                  class="form-control border-left-0"
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
              <br />
              {/* verify code btn  */}
              <div class="text-center">
                <button
                  type="button"
                  class="btn btn-block"
                  style={{
                    backgroundColor: "#764A34",
                    color: "#ffffff",
                    borderRadius: "8px",
                  }}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
