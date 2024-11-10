import { useEffect } from "react";
import "./App.css";
import { ZoomMtg } from "@zoom/meetingsdk";

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const sdkKey = urlParams.get("sdkKey") || "dyiSQHQVRzm4AnLYfewrQ";
  const meetingNumber = urlParams.get("meetingNumber") || "";
  const signature = urlParams.get("signature") || "";
  const passWord = urlParams.get("passWord") || "";
  // const role = 0;
  const userName = urlParams.get("userName") || "";
  const userEmail = urlParams.get("userEmail") || "";
  const registrantToken = "";
  const zakToken = "";
  const leaveUrl = "http://localhost:5173";

  function startMeeting() {
    document.getElementById("zmmtg-root")!.style.display = "block";

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: true,
      leaveOnPageUnload: true,
      success: (success: unknown) => {
        console.log(success);
        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
          success: (success: unknown) => {
            console.log(success);
          },
          error: (error: unknown) => {
            console.error("Failed to join meeting:", error);
            if ((error as { errorCode: number }).errorCode === 4011) {
              console.error(
                "App needs to be published or added as a test user. Please check Zoom Marketplace settings."
              );
            }
          },
        });
      },
      error: (error: unknown) => {
        console.log(error);
      },
    });
  }

  useEffect(() => {
    startMeeting();
  });

  return null;
}

export default App;
