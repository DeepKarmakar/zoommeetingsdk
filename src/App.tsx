import { useState } from "react";
import "./App.css";
import { ZoomMtg } from "@zoom/meetingsdk";
import generateMeetingSignature from "./token";

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

function App() {
  const [role, setRole] = useState("host");
  const [guestName, setGuestName] = useState("");

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuestName(event.target.value);
  };
  const sdkKey = "AFH7h8bSTPWrVKfOlHkCQ";
  const sdkSecret = "3IkzSB6wzuIsofwOG7s1aSrVPjsMjvWk";
  const meetingNumber = 81090210122;
  const passWord = "ks6isg";
  const userName = role === "host" ? "React" : guestName;
  const userEmail = "";
  const registrantToken = "";
  const zakToken = "";
  const leaveUrl = "https://zoommeetingsdk-b9c63.web.app/";

  const startMeeting = async () => {
    document.getElementById("zmmtg-root")!.style.display = "block";

    const signature = await generateMeetingSignature(
      sdkKey,
      sdkSecret,
      meetingNumber,
      role === "host" ? 1 : 0
    );

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: true,
      leaveOnPageUnload: true,
      success: (success: unknown) => {
        console.log(success);
        // can this be async?
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
            console.log(error);
          },
        });
      },
      error: (error: unknown) => {
        console.log(error);
      },
    });
  };

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>
        <label>
          Select Role:
          <select value={role} onChange={handleRoleChange}>
            <option value="host">Host</option>
            <option value="guest">Guest</option>
          </select>
        </label>
        <hr />
        {role === "guest" && (
          <div>
            <label>
              Name:
              <input
                type="text"
                value={guestName}
                onChange={handleNameChange}
              />
            </label>
          </div>
        )}
        <button onClick={startMeeting}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
