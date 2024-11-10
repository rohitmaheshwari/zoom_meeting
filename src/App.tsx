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
  const role = 0;
  const userName = urlParams.get("userName") || "";
  const userEmail = urlParams.get("userEmail") || "";
  const registrantToken = "";
  const zakToken = "";
  const leaveUrl = "http://localhost:5173";

  function startMeeting(signature: string) {
    document.getElementById("zmmtg-root")!.style.display = "block";

    console.log(signature);

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
          error: (error: any) => {
            console.error("Failed to join meeting:", error);
            if (error.errorCode === 4011) {
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

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>
        <button onClick={() => startMeeting(signature)}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
